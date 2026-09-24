import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ApiService, InfoResponse } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(ApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('getInfo appelle GET /api/info et renvoie la réponse', () => {
    const expected: InfoResponse = {
      course: 'Déploiement & CI/CD',
      message: 'Le backend répond correctement.',
      version: '0.1.0',
      servedAt: '2026-01-01T00:00:00.000Z'
    };
    let result: InfoResponse | undefined;

    service.getInfo().subscribe(info => (result = info));

    const req = http.expectOne(request => request.url.endsWith('/api/info'));
    expect(req.request.method).toBe('GET');
    req.flush(expected);

    expect(result).toEqual(expected);
  });
});
