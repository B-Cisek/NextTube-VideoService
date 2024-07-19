import request from 'supertest'
import {application, Shutdown} from '../../src/server';

describe('Our Application', () => {
    afterAll((done) => {
        Shutdown(done);
    })

    it('should start and has the proper test environment', async () => {
        expect(process.env.NODE_ENV).toBe('test');
        expect(application).toBeDefined();
    }, 10000);
})