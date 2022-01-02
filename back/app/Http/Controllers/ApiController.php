<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return response()->json(
            collect([26, 28, 46, 57, 25, 43, 63, 27, 12, 42])->map(function ($id, $i) {
                return [
                    'id'    => $id,
                    'title' => "Picture" . ($i + 1) . " from Laravel backend",
                    'url'   => "https://picsum.photos/id/{$id}/80/80",
                ];
            })
        );
    }
}
