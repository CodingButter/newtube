/**
 * Test utilities for emotion analysis and SSML generation
 */

import { EmotionType, EmotionAnalysis } from '../types/emotion.types.js';

export interface EmotionTestCase {
  id: string;
  input: string;
  expectedEmotion: EmotionType;
  expectedConfidence: number; // minimum expected confidence
  expectedSentiment: 'positive' | 'neutral' | 'negative';
  expectedIntensity: 'low' | 'medium' | 'high';
  category: string;
  description: string;
}

export interface SSMLTestCase {
  id: string;
  input: string;
  emotion: EmotionType;
  expectedSSMLElements: string[]; // SSML tags that should be present
  expectedProsodyChanges: string[]; // prosody attributes that should be modified
  description: string;
}

export interface ConversationTestCase {
  id: string;
  turns: Array<{
    userInput: string;
    assistantResponse: string;
    expectedResponseEmotion: EmotionType;
  }>;
  expectedStrategy: 'mirror' | 'complement' | 'guide' | 'stabilize';
  description: string;
}

/**
 * Comprehensive test cases for emotion detection
 */
export const EMOTION_TEST_CASES: EmotionTestCase[] = [
  // Happy emotion tests
  {
    id: 'happy-1',
    input: 'This is absolutely wonderful! I love how this works!',
    expectedEmotion: 'happy',
    expectedConfidence: 0.7,
    expectedSentiment: 'positive',
    expectedIntensity: 'high',
    category: 'positive_emotions',
    description: 'Strong positive emotion with multiple indicators'
  },
  {
    id: 'happy-2',
    input: 'Great job on the video player! It looks fantastic.',
    expectedEmotion: 'happy',
    expectedConfidence: 0.6,
    expectedSentiment: 'positive',
    expectedIntensity: 'medium',
    category: 'positive_emotions',
    description: 'Moderate happiness with appreciation'
  },

  // Excited emotion tests
  {
    id: 'excited-1',
    input: 'Wow! This is incredible! I can\'t believe how amazing this is!',
    expectedEmotion: 'excited',
    expectedConfidence: 0.8,
    expectedSentiment: 'positive',
    expectedIntensity: 'high',
    category: 'high_energy',
    description: 'High excitement with multiple exclamations'
  },
  {
    id: 'excited-2',
    input: 'Revolutionary! This breakthrough technology is mind-blowing!',
    expectedEmotion: 'excited',
    expectedConfidence: 0.7,
    expectedSentiment: 'positive',
    expectedIntensity: 'high',
    category: 'high_energy',
    description: 'Technology excitement with superlatives'
  },

  // Curious emotion tests
  {
    id: 'curious-1',
    input: 'How does this work? I\'m really interested in learning more about it.',
    expectedEmotion: 'curious',
    expectedConfidence: 0.8,
    expectedSentiment: 'neutral',
    expectedIntensity: 'medium',
    category: 'information_seeking',
    description: 'Direct question with learning interest'
  },
  {
    id: 'curious-2',
    input: 'That\'s fascinating! Tell me more about the technical details.',
    expectedEmotion: 'curious',
    expectedConfidence: 0.7,
    expectedSentiment: 'positive',
    expectedIntensity: 'medium',
    category: 'information_seeking',
    description: 'Interest in technical information'
  },

  // Helpful emotion tests
  {
    id: 'helpful-1',
    input: 'I can help you set up the video panels. Let me show you how.',
    expectedEmotion: 'helpful',
    expectedConfidence: 0.8,
    expectedSentiment: 'positive',
    expectedIntensity: 'medium',
    category: 'assistance',
    description: 'Direct offer to help with action'
  },
  {
    id: 'helpful-2',
    input: 'Here are some tips to improve your layout design.',
    expectedEmotion: 'helpful',
    expectedConfidence: 0.7,
    expectedSentiment: 'positive',
    expectedIntensity: 'low',
    category: 'assistance',
    description: 'Providing guidance and tips'
  },

  // Calm emotion tests
  {
    id: 'calm-1',
    input: 'Don\'t worry, we can fix this easily. Just take your time.',
    expectedEmotion: 'calm',
    expectedConfidence: 0.7,
    expectedSentiment: 'positive',
    expectedIntensity: 'low',
    category: 'reassurance',
    description: 'Reassuring message with calming language'
  },
  {
    id: 'calm-2',
    input: 'Let\'s approach this step by step. Everything will be fine.',
    expectedEmotion: 'calm',
    expectedConfidence: 0.6,
    expectedSentiment: 'neutral',
    expectedIntensity: 'low',
    category: 'reassurance',
    description: 'Methodical approach with reassurance'
  },

  // Confident emotion tests
  {
    id: 'confident-1',
    input: 'Absolutely! I\'m certain this is the best approach for your needs.',
    expectedEmotion: 'confident',
    expectedConfidence: 0.8,
    expectedSentiment: 'positive',
    expectedIntensity: 'high',
    category: 'assertion',
    description: 'Strong confidence with certainty words'
  },
  {
    id: 'confident-2',
    input: 'This solution will definitely work. I\'m sure of it.',
    expectedEmotion: 'confident',
    expectedConfidence: 0.7,
    expectedSentiment: 'positive',
    expectedIntensity: 'medium',
    category: 'assertion',
    description: 'Confident assertion about solution'
  },

  // Surprised emotion tests
  {
    id: 'surprised-1',
    input: 'Really? I had no idea it could do that! That\'s unexpected.',
    expectedEmotion: 'surprised',
    expectedConfidence: 0.7,
    expectedSentiment: 'positive',
    expectedIntensity: 'medium',
    category: 'reaction',
    description: 'Surprise reaction to new information'
  },

  // Thoughtful emotion tests
  {
    id: 'thoughtful-1',
    input: 'Hmm, let me think about this carefully. There are several considerations.',
    expectedEmotion: 'thoughtful',
    expectedConfidence: 0.7,
    expectedSentiment: 'neutral',
    expectedIntensity: 'medium',
    category: 'reflection',
    description: 'Contemplative language with deliberation'
  },

  // Encouraging emotion tests
  {
    id: 'encouraging-1',
    input: 'You\'re doing great! Keep going, you\'ve almost got it.',
    expectedEmotion: 'encouraging',
    expectedConfidence: 0.8,
    expectedSentiment: 'positive',
    expectedIntensity: 'medium',
    category: 'motivation',
    description: 'Motivational language with support'
  }
];

/**
 * Test cases for SSML generation
 */
export const SSML_TEST_CASES: SSMLTestCase[] = [
  {
    id: 'ssml-excited-1',
    input: 'This is absolutely incredible!',
    emotion: 'excited',
    expectedSSMLElements: ['<speak>', '<prosody', '<emotion'],
    expectedProsodyChanges: ['rate="120%"', 'pitch="+15%"', 'volume="x-loud"'],
    description: 'Excited emotion should increase rate, pitch, and volume'
  },
  {
    id: 'ssml-calm-1',
    input: 'Let\'s take this slowly and carefully.',
    emotion: 'calm',
    expectedSSMLElements: ['<speak>', '<prosody', '<break'],
    expectedProsodyChanges: ['rate="85%"', 'pitch="-5%"'],
    description: 'Calm emotion should decrease rate and add breaks'
  },
  {
    id: 'ssml-curious-1',
    input: 'How does this feature work?',
    emotion: 'curious',
    expectedSSMLElements: ['<speak>', '<prosody'],
    expectedProsodyChanges: ['rate="90%"', 'pitch="+5%"'],
    description: 'Curious emotion should have moderate pace with rising intonation'
  },
  {
    id: 'ssml-confident-1',
    input: 'I\'m absolutely certain this will work perfectly.',
    emotion: 'confident',
    expectedSSMLElements: ['<speak>', '<prosody', '<emphasis'],
    expectedProsodyChanges: ['rate="105%"', 'pitch="+3%"'],
    description: 'Confident emotion should have emphasis and steady pace'
  }
];

/**
 * Test cases for conversation emotional consistency
 */
export const CONVERSATION_TEST_CASES: ConversationTestCase[] = [
  {
    id: 'conv-mirror-1',
    turns: [
      {
        userInput: 'I\'m so excited about this new feature!',
        assistantResponse: 'That\'s wonderful! I\'m thrilled to help you explore it!',
        expectedResponseEmotion: 'excited'
      },
      {
        userInput: 'This is exactly what I needed!',
        assistantResponse: 'Fantastic! I\'m delighted it meets your needs perfectly!',
        expectedResponseEmotion: 'happy'
      }
    ],
    expectedStrategy: 'mirror',
    description: 'Assistant should mirror user\'s positive excitement'
  },
  {
    id: 'conv-guide-1',
    turns: [
      {
        userInput: 'I\'m frustrated. This isn\'t working at all.',
        assistantResponse: 'I understand your frustration. Let me help you fix this step by step.',
        expectedResponseEmotion: 'helpful'
      },
      {
        userInput: 'I still can\'t get it to work.',
        assistantResponse: 'Don\'t worry, we\'ll figure this out together. You\'re making progress.',
        expectedResponseEmotion: 'encouraging'
      }
    ],
    expectedStrategy: 'guide',
    description: 'Assistant should guide toward positive resolution'
  },
  {
    id: 'conv-complement-1',
    turns: [
      {
        userInput: 'I\'m really overwhelmed by all these options.',
        assistantResponse: 'Let\'s take this calmly, one step at a time.',
        expectedResponseEmotion: 'calm'
      }
    ],
    expectedStrategy: 'complement',
    description: 'Assistant should complement overwhelmed feeling with calm approach'
  }
];

/**
 * Emotion analysis accuracy test runner
 */
export class EmotionTestRunner {
  private results: Map<string, boolean> = new Map();
  private detailedResults: Map<string, any> = new Map();

  async runEmotionTests(
    analyzeFunction: (text: string) => Promise<EmotionAnalysis>
  ): Promise<{
    passed: number;
    failed: number;
    accuracy: number;
    details: Array<{
      testId: string;
      passed: boolean;
      expected: any;
      actual: any;
      reason?: string;
    }>;
  }> {
    const results = [];
    let passed = 0;
    let failed = 0;

    for (const testCase of EMOTION_TEST_CASES) {
      try {
        const result = await analyzeFunction(testCase.input);
        
        const emotionMatch = result.primaryEmotion === testCase.expectedEmotion;
        const confidenceMatch = result.confidence >= testCase.expectedConfidence;
        const sentimentMatch = result.sentiment === testCase.expectedSentiment;
        
        const testPassed = emotionMatch && confidenceMatch && sentimentMatch;
        
        if (testPassed) {
          passed++;
        } else {
          failed++;
        }

        results.push({
          testId: testCase.id,
          passed: testPassed,
          expected: {
            emotion: testCase.expectedEmotion,
            confidence: testCase.expectedConfidence,
            sentiment: testCase.expectedSentiment,
            intensity: testCase.expectedIntensity
          },
          actual: {
            emotion: result.primaryEmotion,
            confidence: result.confidence,
            sentiment: result.sentiment,
            intensity: result.intensity
          },
          reason: testPassed ? undefined : 
            `Expected ${testCase.expectedEmotion}, got ${result.primaryEmotion}. ` +
            `Confidence: ${result.confidence.toFixed(2)} (min: ${testCase.expectedConfidence})`
        });

      } catch (error) {
        failed++;
        results.push({
          testId: testCase.id,
          passed: false,
          expected: { emotion: testCase.expectedEmotion },
          actual: { error: error instanceof Error ? error.message : 'Unknown error' },
          reason: 'Test execution failed'
        });
      }
    }

    return {
      passed,
      failed,
      accuracy: passed / (passed + failed),
      details: results
    };
  }

  async runSSMLTests(
    generateSSMLFunction: (text: string, emotion: EmotionAnalysis) => Promise<string>
  ): Promise<{
    passed: number;
    failed: number;
    details: Array<{
      testId: string;
      passed: boolean;
      ssml: string;
      foundElements: string[];
      missingElements: string[];
    }>;
  }> {
    const results = [];
    let passed = 0;
    let failed = 0;

    for (const testCase of SSML_TEST_CASES) {
      try {
        const mockEmotion: EmotionAnalysis = {
          primaryEmotion: testCase.emotion,
          secondaryEmotions: [],
          confidence: 0.8,
          sentiment: 'positive',
          intensity: 'medium',
          reasoning: 'Test case'
        };

        const ssml = await generateSSMLFunction(testCase.input, mockEmotion);
        
        const foundElements = testCase.expectedSSMLElements.filter(element => 
          ssml.includes(element)
        );
        const missingElements = testCase.expectedSSMLElements.filter(element => 
          !ssml.includes(element)
        );

        const testPassed = missingElements.length === 0;
        
        if (testPassed) {
          passed++;
        } else {
          failed++;
        }

        results.push({
          testId: testCase.id,
          passed: testPassed,
          ssml,
          foundElements,
          missingElements
        });

      } catch (error) {
        failed++;
        results.push({
          testId: testCase.id,
          passed: false,
          ssml: '',
          foundElements: [],
          missingElements: testCase.expectedSSMLElements
        });
      }
    }

    return {
      passed,
      failed,
      details: results
    };
  }

  generateTestReport(
    emotionResults: any,
    ssmlResults: any
  ): string {
    let report = '# Emotion Analysis Test Report\n\n';
    
    report += `## Emotion Detection Results\n`;
    report += `- Tests Run: ${emotionResults.passed + emotionResults.failed}\n`;
    report += `- Passed: ${emotionResults.passed}\n`;
    report += `- Failed: ${emotionResults.failed}\n`;
    report += `- Accuracy: ${(emotionResults.accuracy * 100).toFixed(1)}%\n\n`;

    report += `## SSML Generation Results\n`;
    report += `- Tests Run: ${ssmlResults.passed + ssmlResults.failed}\n`;
    report += `- Passed: ${ssmlResults.passed}\n`;
    report += `- Failed: ${ssmlResults.failed}\n`;
    report += `- Success Rate: ${(ssmlResults.passed / (ssmlResults.passed + ssmlResults.failed) * 100).toFixed(1)}%\n\n`;

    // Add failed test details
    const failedEmotionTests = emotionResults.details.filter((t: any) => !t.passed);
    if (failedEmotionTests.length > 0) {
      report += `## Failed Emotion Tests\n`;
      for (const test of failedEmotionTests) {
        report += `- **${test.testId}**: ${test.reason}\n`;
      }
      report += '\n';
    }

    const failedSSMLTests = ssmlResults.details.filter((t: any) => !t.passed);
    if (failedSSMLTests.length > 0) {
      report += `## Failed SSML Tests\n`;
      for (const test of failedSSMLTests) {
        report += `- **${test.testId}**: Missing elements: ${test.missingElements.join(', ')}\n`;
      }
    }

    return report;
  }
}