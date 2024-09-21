

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InscriptionDataService } from './inscripciondata.service';

describe('InscriptionDataService', () => {
  let service: InscriptionDataService;
  let httpMock: HttpTestingController;
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InscriptionDataService]
    });
    
    service = TestBed.inject(InscriptionDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should add a new inscription when valid student_id, course_id, and inscription_date are provided', () => {
    // Arrange
    const student_id = '123';
    const course_id = '456';
    const inscription_date = '2024-03-13';
    const requestBody = { student_id, course_id, inscription_date };
    const expectedResponse = { message: 'Inscripción creada exitosamente', data: {} };

    // Act
    const result$ = service.addInscription(student_id, course_id, inscription_date);

    // Assert
    result$.subscribe(response => {
        expect(response.message).toEqual(expectedResponse.message);
    });

    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.data).not.toBeNull();
    req.flush(expectedResponse); 
  });
  it('should throw an error when student_id parameter is missing', () => {
    // Arrange
    const course_id = '2';
    const inscription_date = '2021-01-01';
    const expectedResponse = {}; 

    // Act
    const result$ = service.addInscription( '',course_id, inscription_date);

    // Assert
    result$.subscribe({
        error: err => {
            expect(err).toBeDefined();
        }
    });

    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('POST');
    req.flush(expectedResponse); 
  });

  it('should throw an error when course_id parameter is missing', () => {
    // Arrange
    const student_id = '2';
    const inscription_date = '2021-01-01';
    const expectedResponse = {}; 

    // Act
    const result$ = service.addInscription(student_id, '', inscription_date);

    // Assert
    result$.subscribe({
        error: err => {
            expect(err).toBeDefined();
        }
    });

    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('POST');
    req.flush(expectedResponse); 
  });

  it('should throw an error when date is missing', () => {
    // Arrange
    const student_id = '2';
    const course_id = '4';
    const expectedResponse = {}; 

    // Act
    const result$ = service.addInscription(student_id, course_id, '');

    // Assert
    result$.subscribe({
        error: err => {
            expect(err).toBeDefined();
        }
    });

    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('POST');
    req.flush(expectedResponse); 
  });

    it('should return an Observable with the expected inscription data when a valid student_id is provided', () => {
    // Arrange
    const student_id = 'valid_student_id';
    const expectedResponse = {};
  
    // Act
    const result$ = service.getInscriptionByStudentId(student_id);
  
    // Assert
    result$.subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });
  
    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('GET');
    req.flush(expectedResponse); 
  });

  it('should throw an error if the API call fails', () => {
    // Arrange
    const student_id = '123';
    const mockErrorResponse = { status: 500, statusText: 'Server Error' };
    const data = 'Invalid request';
  
    // Act
    const result = service.getInscriptionByStudentId(student_id);
  
    // Assert
    result.subscribe({
      error: err => {
        expect(err).toBeDefined();
      }
    });
  
    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('GET');
    req.flush(data, mockErrorResponse); 
  });
  it('should send a DELETE request to the correct API endpoint with the given inscription ID', () => {
    // Arrange
    const inscID = '123';
    const expectedResponse = { message: 'Inscripcion Eliminada'}
  
    // Act
    const result$ = service.deleteInscriptionById(inscID);
  
    // Assert
    result$.subscribe(response => {
        expect(response.message).toEqual(expectedResponse.message);
    });
  
    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('DELETE');
    req.flush(expectedResponse); 
  });

  it('should handle and return an observable with an error message when inscID parameter is null or undefined', () => {
    // Arrange
    const inscID = '';
    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
    const data = 'inscID parameter is null or undefined';
  
    // Act
    const result = service.deleteInscriptionById(inscID);
  
    // Assert
    result.subscribe({
      error: err => {
        expect(err).toBeDefined();
        expect(err.error).toEqual(data);
      }
    });
  
    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('DELETE');
    req.flush(data, mockErrorResponse); 
  });
});