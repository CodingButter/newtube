#!/usr/bin/env node

/**
 * Comprehensive test script for the emotion analysis and SSML generation system
 * Run with: npx tsx src/scripts/test-emotion-system.ts
 */

import { EmotionAnalysisService } from '../services/emotion-analysis.service.js';
import { SSMLGeneratorService } from '../services/ssml-generator.service.js';
import { EmotionalConsistencyService } from '../services/emotional-consistency.service.js';
import { 
  EmotionTestRunner, 
  EMOTION_TEST_CASES, 
  SSML_TEST_CASES,
  CONVERSATION_TEST_CASES
} from '../utils/emotion-test-utils.js';
import { logger } from '../lib/logger.js';

class EmotionSystemTester {
  private emotionAnalysis: EmotionAnalysisService;
  private ssmlGenerator: SSMLGeneratorService;
  private emotionalConsistency: EmotionalConsistencyService;
  private testRunner: EmotionTestRunner;

  constructor() {
    this.emotionAnalysis = new EmotionAnalysisService();
    this.ssmlGenerator = new SSMLGeneratorService();
    this.emotionalConsistency = new EmotionalConsistencyService();
    this.testRunner = new EmotionTestRunner();
  }

  async runAllTests(): Promise<void> {
    console.log('🧪 Starting comprehensive emotion system tests...\n');
    
    try {
      // Test emotion analysis accuracy
      console.log('1️⃣ Testing emotion analysis accuracy...');
      const emotionResults = await this.testEmotionAnalysis();
      
      // Test SSML generation
      console.log('\n2️⃣ Testing SSML generation...');
      const ssmlResults = await this.testSSMLGeneration();
      
      // Test conversation consistency
      console.log('\n3️⃣ Testing conversation emotional consistency...');
      const conversationResults = await this.testConversationalConsistency();
      
      // Test performance benchmarks
      console.log('\n4️⃣ Running performance benchmarks...');
      const performanceResults = await this.testPerformance();
      
      // Test error handling
      console.log('\n5️⃣ Testing error handling...');
      const errorResults = await this.testErrorHandling();
      
      // Generate comprehensive report
      console.log('\n📊 Generating test report...');
      this.generateComprehensiveReport({
        emotion: emotionResults,
        ssml: ssmlResults,
        conversation: conversationResults,
        performance: performanceResults,
        errorHandling: errorResults
      });
      
    } catch (error) {
      console.error('❌ Test suite failed:', error);
      process.exit(1);
    }
  }

  private async testEmotionAnalysis(): Promise<any> {
    const results = await this.testRunner.runEmotionTests(
      (text: string) => this.emotionAnalysis.analyzeText(text, true)
    );
    
    console.log(`   ✅ Passed: ${results.passed}`);
    console.log(`   ❌ Failed: ${results.failed}`);
    console.log(`   📈 Accuracy: ${(results.accuracy * 100).toFixed(1)}%`);
    
    // Test specific emotion categories
    const categoryResults = await this.testEmotionCategories();
    
    return {
      ...results,
      categoryBreakdown: categoryResults
    };
  }

  private async testEmotionCategories(): Promise<any> {
    const categories = [...new Set(EMOTION_TEST_CASES.map(t => t.category))];
    const categoryResults: any = {};
    
    for (const category of categories) {
      const categoryTests = EMOTION_TEST_CASES.filter(t => t.category === category);
      let passed = 0;
      
      for (const test of categoryTests) {
        try {
          const result = await this.emotionAnalysis.analyzeText(test.input, true);
          if (result.primaryEmotion === test.expectedEmotion) {
            passed++;
          }
        } catch (error) {
          // Test failed
        }
      }
      
      categoryResults[category] = {
        total: categoryTests.length,
        passed,
        accuracy: passed / categoryTests.length
      };
    }
    
    console.log('   📋 Category breakdown:');
    for (const [category, stats] of Object.entries(categoryResults)) {
      const accuracy = ((stats as any).accuracy * 100).toFixed(1);
      console.log(`      ${category}: ${accuracy}% (${(stats as any).passed}/${(stats as any).total})`);
    }
    
    return categoryResults;
  }

  private async testSSMLGeneration(): Promise<any> {
    const results = await this.testRunner.runSSMLTests(
      (text: string, emotion: any) => this.ssmlGenerator.generateSSML(text, emotion)
    );
    
    console.log(`   ✅ Passed: ${results.passed}`);
    console.log(`   ❌ Failed: ${results.failed}`);
    console.log(`   📈 Success Rate: ${(results.passed / (results.passed + results.failed) * 100).toFixed(1)}%`);
    
    // Test SSML validation
    const validationResults = await this.testSSMLValidation();
    
    return {
      ...results,
      validation: validationResults
    };
  }

  private async testSSMLValidation(): Promise<any> {
    const testTexts = [
      'This is a simple test.',
      'Wow! This is absolutely amazing!',
      'Let me think about this carefully...',
      'I\'m confident this will work perfectly.'
    ];
    
    let validSSMLCount = 0;
    const validationResults = [];
    
    for (const text of testTexts) {
      try {
        const emotion = await this.emotionAnalysis.analyzeText(text);
        const ssml = await this.ssmlGenerator.generateSSML(text, emotion);
        
        // Basic SSML validation
        const isValid = ssml.includes('<speak>') && ssml.includes('</speak>');
        if (isValid) validSSMLCount++;
        
        validationResults.push({
          text,
          ssml,
          valid: isValid,
          length: ssml.length
        });
      } catch (error) {
        validationResults.push({
          text,
          error: error instanceof Error ? error.message : 'Unknown error',
          valid: false
        });
      }
    }
    
    console.log(`   🔍 SSML Validation: ${validSSMLCount}/${testTexts.length} valid`);
    
    return {
      totalTests: testTexts.length,
      validCount: validSSMLCount,
      details: validationResults
    };
  }

  private async testConversationalConsistency(): Promise<any> {
    const results = [];
    
    for (const testCase of CONVERSATION_TEST_CASES) {
      try {
        const sessionId = `test-${testCase.id}-${Date.now()}`;
        let conversationPassed = true;
        const turnResults = [];
        
        for (let i = 0; i < testCase.turns.length; i++) {
          const turn = testCase.turns[i];
          
          const emotionResponse = await this.emotionalConsistency.processConversationTurn(
            sessionId,
            turn.userInput,
            turn.assistantResponse
          );
          
          const emotionMatch = emotionResponse.emotions.primaryEmotion === turn.expectedResponseEmotion;
          if (!emotionMatch) {
            conversationPassed = false;
          }
          
          turnResults.push({
            turn: i + 1,
            expected: turn.expectedResponseEmotion,
            actual: emotionResponse.emotions.primaryEmotion,
            matched: emotionMatch
          });
        }
        
        // Check final conversation state
        const conversationState = this.emotionalConsistency.getConversationState(sessionId);
        const strategyMatch = conversationState?.adaptationStrategy === testCase.expectedStrategy;
        
        results.push({
          testId: testCase.id,
          passed: conversationPassed && strategyMatch,
          strategyMatch,
          turnResults,
          finalStrategy: conversationState?.adaptationStrategy
        });
        
        // Clean up test conversation
        this.emotionalConsistency.clearConversation(sessionId);
        
      } catch (error) {
        results.push({
          testId: testCase.id,
          passed: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
    
    const passed = results.filter(r => r.passed).length;
    const failed = results.length - passed;
    
    console.log(`   ✅ Passed: ${passed}`);
    console.log(`   ❌ Failed: ${failed}`);
    console.log(`   📈 Success Rate: ${(passed / results.length * 100).toFixed(1)}%`);
    
    return {
      passed,
      failed,
      details: results
    };
  }

  private async testPerformance(): Promise<any> {
    const performanceTests = [
      { text: 'Short text', length: 'short' },
      { text: 'This is a medium length text that contains multiple sentences and should provide a good test of processing time for typical user inputs.', length: 'medium' },
      { text: 'This is a very long text that simulates a complex user interaction with multiple emotional markers, various sentiment indicators, and sophisticated language patterns that would challenge the emotion analysis system to process efficiently while maintaining accuracy. The text includes questions, exclamations, and different emotional states to provide a comprehensive test of the system\'s capabilities.', length: 'long' }
    ];
    
    const results: any = {
      emotionAnalysis: [],
      ssmlGeneration: [],
      fullPipeline: []
    };
    
    for (const test of performanceTests) {
      // Test emotion analysis performance
      const emotionStart = Date.now();
      const emotion = await this.emotionAnalysis.analyzeText(test.text);
      const emotionTime = Date.now() - emotionStart;
      
      results.emotionAnalysis.push({
        length: test.length,
        time: emotionTime,
        textLength: test.text.length
      });
      
      // Test SSML generation performance
      const ssmlStart = Date.now();
      const ssml = await this.ssmlGenerator.generateSSML(test.text, emotion);
      const ssmlTime = Date.now() - ssmlStart;
      
      results.ssmlGeneration.push({
        length: test.length,
        time: ssmlTime,
        ssmlLength: ssml.length
      });
      
      // Test full pipeline performance
      const pipelineStart = Date.now();
      const sessionId = `perf-test-${Date.now()}`;
      await this.emotionalConsistency.processConversationTurn(
        sessionId,
        'Test input',
        test.text
      );
      const pipelineTime = Date.now() - pipelineStart;
      
      results.fullPipeline.push({
        length: test.length,
        time: pipelineTime
      });
      
      this.emotionalConsistency.clearConversation(sessionId);
    }
    
    // Calculate averages
    const avgEmotionTime = results.emotionAnalysis.reduce((sum: number, r: any) => sum + r.time, 0) / results.emotionAnalysis.length;
    const avgSSMLTime = results.ssmlGeneration.reduce((sum: number, r: any) => sum + r.time, 0) / results.ssmlGeneration.length;
    const avgPipelineTime = results.fullPipeline.reduce((sum: number, r: any) => sum + r.time, 0) / results.fullPipeline.length;
    
    console.log(`   ⚡ Avg Emotion Analysis: ${avgEmotionTime.toFixed(0)}ms`);
    console.log(`   ⚡ Avg SSML Generation: ${avgSSMLTime.toFixed(0)}ms`);
    console.log(`   ⚡ Avg Full Pipeline: ${avgPipelineTime.toFixed(0)}ms`);
    
    // Check if performance meets requirements
    const meetsRequirements = {
      emotion: avgEmotionTime < 200, // < 200ms requirement
      ssml: avgSSMLTime < 100, // < 100ms requirement
      pipeline: avgPipelineTime < 300 // < 300ms total requirement
    };
    
    console.log(`   🎯 Performance Requirements:`);
    console.log(`      Emotion Analysis: ${meetsRequirements.emotion ? '✅' : '❌'} (${avgEmotionTime.toFixed(0)}ms < 200ms)`);
    console.log(`      SSML Generation: ${meetsRequirements.ssml ? '✅' : '❌'} (${avgSSMLTime.toFixed(0)}ms < 100ms)`);
    console.log(`      Full Pipeline: ${meetsRequirements.pipeline ? '✅' : '❌'} (${avgPipelineTime.toFixed(0)}ms < 300ms)`);
    
    return {
      ...results,
      averages: {
        emotion: avgEmotionTime,
        ssml: avgSSMLTime,
        pipeline: avgPipelineTime
      },
      requirementsMet: meetsRequirements
    };
  }

  private async testErrorHandling(): Promise<any> {
    const errorTests = [
      { name: 'Empty text', input: '' },
      { name: 'Very long text', input: 'a'.repeat(10000) },
      { name: 'Special characters', input: '!@#$%^&*()_+{}|:<>?[]\\;\'",./`~' },
      { name: 'Non-English text', input: 'こんにちは世界 Здравствуй мир 🌍🚀' },
      { name: 'HTML content', input: '<script>alert("test")</script><p>HTML content</p>' }
    ];
    
    const results = [];
    
    for (const test of errorTests) {
      try {
        const emotion = await this.emotionAnalysis.analyzeText(test.input);
        const ssml = await this.ssmlGenerator.generateSSML(test.input, emotion);
        
        results.push({
          name: test.name,
          passed: true,
          emotion: emotion.primaryEmotion,
          hasSSML: ssml.length > 0
        });
      } catch (error) {
        results.push({
          name: test.name,
          passed: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
    
    const passed = results.filter(r => r.passed).length;
    const failed = results.length - passed;
    
    console.log(`   ✅ Handled gracefully: ${passed}`);
    console.log(`   ❌ Failed to handle: ${failed}`);
    
    return {
      passed,
      failed,
      details: results
    };
  }

  private generateComprehensiveReport(results: any): void {
    const report = this.testRunner.generateTestReport(results.emotion, results.ssml);
    
    console.log('\n' + '='.repeat(80));
    console.log('📋 COMPREHENSIVE EMOTION SYSTEM TEST REPORT');
    console.log('='.repeat(80));
    
    console.log(report);
    
    console.log('\n📊 PERFORMANCE SUMMARY');
    console.log('─'.repeat(40));
    console.log(`Emotion Analysis: ${results.performance.averages.emotion.toFixed(0)}ms avg`);
    console.log(`SSML Generation: ${results.performance.averages.ssml.toFixed(0)}ms avg`);
    console.log(`Full Pipeline: ${results.performance.averages.pipeline.toFixed(0)}ms avg`);
    
    console.log('\n🛡️ ERROR HANDLING SUMMARY');
    console.log('─'.repeat(40));
    console.log(`Graceful handling: ${results.errorHandling.passed}/${results.errorHandling.passed + results.errorHandling.failed}`);
    
    console.log('\n🎯 OVERALL ASSESSMENT');
    console.log('─'.repeat(40));
    const overallScore = (
      results.emotion.accuracy * 0.4 +
      (results.ssml.passed / (results.ssml.passed + results.ssml.failed)) * 0.3 +
      (results.conversation.passed / (results.conversation.passed + results.conversation.failed)) * 0.2 +
      (results.errorHandling.passed / (results.errorHandling.passed + results.errorHandling.failed)) * 0.1
    ) * 100;
    
    console.log(`Overall System Score: ${overallScore.toFixed(1)}%`);
    
    if (overallScore >= 85) {
      console.log('🟢 System is production-ready!');
    } else if (overallScore >= 70) {
      console.log('🟡 System needs minor improvements');
    } else {
      console.log('🔴 System needs significant improvements');
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('✅ Test suite completed successfully!');
  }
}

// Run tests if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const tester = new EmotionSystemTester();
  tester.runAllTests().catch(console.error);
}