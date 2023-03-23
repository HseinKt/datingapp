<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(["prefix" => "v0.0.1"], function(){

    Route::match(['get', 'post'], '/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, "register"]);
    Route::get('/register', [AuthController::class, "register"]);
    Route::post('/EditProfile', [AuthController::class, "EditProfile"]);
    Route::get('/getAllUsers', [AuthController::class, "getAllUsers"]);
    Route::post('/getUserbyAge', [AuthController::class, "getUserbyAge"]);
    Route::post('/setLocation', [AuthController::class,"setLocation"]);
    Route::post('/getUserbyLocation', [AuthController::class, "getUserbyLocation"]);
    Route::post('/getUserbyName', [AuthController::class, "getUserbyName"]);
    Route::post('/addImage', [AuthController::class, "addImage"]);
    Route::post('/addFavorite', [AuthController::class, "addFavorite"]);
    Route::post('/removeFavorite', [AuthController::class, "removeFavorite"]);

    
});