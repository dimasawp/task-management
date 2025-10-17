<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler {
    protected function unauthenticated($request, \Illuminate\Auth\AuthenticationException $exception) {
        if ($request->expectsJson() || $request->is('api/*')) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return redirect()->guest(route('login'));
    }
}
