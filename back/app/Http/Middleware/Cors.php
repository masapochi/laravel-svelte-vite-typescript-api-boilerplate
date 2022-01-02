<?php

namespace App\Http\Middleware;

use Closure;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $allowedOrigins = config('app.api_allowed_origins');
        $hostRegex = "/{$request->getHost()}/";
        if (!preg_grep($hostRegex, $allowedOrigins)) {
            abort(403);
        }

        return $next($request)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
            ->header('Access-Control-Allow-Headers', "Content-Type, origin, authorization, accept, X-Requested-With");
    }
}
