"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.fakeBackendProvider = exports.FakeBackendInterceptor = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var users = [{ id: 1, firstName: 'Tim', lastName: 'Weilbach', username: 'TPaW', password: 'test' }];
var FakeBackendInterceptor = /** @class */ (function () {
    function FakeBackendInterceptor() {
    }
    FakeBackendInterceptor.prototype.intercept = function (request, next) {
        var url = request.url, method = request.method, headers = request.headers, body = request.body;
        // wrap in delayed observable to simulate server api call
        return rxjs_1.of(null)
            .pipe(operators_1.mergeMap(handleRoute))
            .pipe(operators_1.materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(operators_1.delay(500))
            .pipe(operators_1.dematerialize());
        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }
        // route functions
        function authenticate() {
            var username = body.username, password = body.password;
            var user = users.find(function (x) { return x.username === username && x.password === password; });
            if (!user)
                return error('Username or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token'
            });
        }
        // helper functions
        function ok(body) {
            return rxjs_1.of(new http_1.HttpResponse({ status: 200, body: body }));
        }
        function error(message) {
            return rxjs_1.throwError({ error: { message: message } });
        }
    };
    FakeBackendInterceptor = __decorate([
        core_1.Injectable()
    ], FakeBackendInterceptor);
    return FakeBackendInterceptor;
}());
exports.FakeBackendInterceptor = FakeBackendInterceptor;
exports.fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: http_1.HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
