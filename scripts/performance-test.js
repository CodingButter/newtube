import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export let options = {
  stages: [
    { duration: '2m', target: 100 },  // Ramp up to 100 users
    { duration: '5m', target: 100 },  // Stay at 100 users
    { duration: '2m', target: 200 },  // Ramp up to 200 users
    { duration: '5m', target: 200 },  // Stay at 200 users
    { duration: '2m', target: 0 },    // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% of requests must complete below 1s
    http_req_failed: ['rate<0.05'],    // Error rate must be below 5%
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
const API_URL = __ENV.API_URL || 'http://localhost:4000';

export default function() {
  // Test frontend
  let frontendResponse = http.get(BASE_URL);
  check(frontendResponse, {
    'frontend status is 200': (r) => r.status === 200,
    'frontend response time < 1000ms': (r) => r.timings.duration < 1000,
  });
  errorRate.add(frontendResponse.status !== 200);

  // Test API health
  let apiResponse = http.get(`${API_URL}/health`);
  check(apiResponse, {
    'api health status is 200': (r) => r.status === 200,
    'api health response time < 500ms': (r) => r.timings.duration < 500,
  });
  errorRate.add(apiResponse.status !== 200);

  // Test GraphQL endpoint
  let graphqlPayload = JSON.stringify({
    query: 'query { __schema { queryType { name } } }'
  });
  let graphqlResponse = http.post(`${API_URL}/graphql`, graphqlPayload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  check(graphqlResponse, {
    'graphql status is 200': (r) => r.status === 200,
    'graphql response time < 1000ms': (r) => r.timings.duration < 1000,
  });
  errorRate.add(graphqlResponse.status !== 200);

  sleep(1);
}
