import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];
let admin = JSON.parse(localStorage.getItem('admin')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticateUser') && method === 'POST':
                    return authenticateUser();
                case url.endsWith('/users/authenticateAdmin') && method === 'POST':
                    return authenticateAdmin();
                case url.endsWith('/users/addPostUser') && method === 'POST':
                    return addPost();
                case url.endsWith('/users/getAllUser') && method === 'GET':
                    return getAllUser();
                case url.endsWith('/admin/actionType') && method === 'POST':
                    return adminActionType();
                    
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function authenticateUser() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                role : 'user',
                token: 'fake-jwt-token-user'
            })
        }

        function authenticateAdmin() {
            const { username, password } = body;
            const user = admin.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                role : 'admin',
                token: 'fake-jwt-token-admin'
            });
        }

        function addPost() {
            let userName = body.formData.get('username')
            const userIndex = users.findIndex(x => x.username === userName);
            users[userIndex].title = body.formData.get('title')
            users[userIndex].description = body.formData.get('description')
            users[userIndex].image = body.formData.get('image')
            users[userIndex].postStatus = 'Pending'
            localStorage.setItem('users',JSON.stringify(users))
            return ok({
                message:"Post has been added Successfuly"
            });   
        }

        function adminActionType(){
            const { username , actionType , rejectionMessage }  = body;
            const userIndex = users.findIndex(x => x.username === username);
            users[userIndex].adminAction = actionType
            users[userIndex].rejectionMessage = rejectionMessage
            users[userIndex].postStatus = 'Posted'
            localStorage.setItem('users',JSON.stringify(users))
            return ok({

            });
        }

        function getAllUser(){
            return ok(users);
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};