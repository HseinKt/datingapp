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
//, "middleware" => "cors"
Route::group(["prefix" => "v0.0.1"], function(){

    Route::match(['get', 'post'], '/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, "register"]);
    Route::get('/register', [AuthController::class, "register"]);

    Route::group(['middleware' => 'auth:api'], function(){
        Route::post('/edit_profile', [AuthController::class, "editProfile"]);
        Route::get('/get_profile/{user_id}', [AuthController::class, "getProfileDetails"]);
        Route::get('/get_all_users', [AuthController::class, "getAllUsers"]);
        Route::post('/get_user_by_age', [AuthController::class, "getUserbyAge"]);
        Route::post('/set_location', [AuthController::class,"setLocation"]);
        Route::post('/get_user_by_location', [AuthController::class, "getUserbyLocation"]);
        Route::post('/get_user_by_name', [AuthController::class, "getUserbyName"]);
        Route::post('/add_image', [AuthController::class, "addImage"]);
        Route::post('/add_favorite', [AuthController::class, "addFavorite"]);
        Route::post('/remove_favorite_Or_Block', [AuthController::class, "removeFavoriteOrBlock"]);
        Route::post('/add_block', [AuthController::class, "addBlock"]);
        Route::post('/send_message', [AuthController::class, "sendMessage"]);
        Route::post('/get_messages', [AuthController::class, "getMessages"]);

   });
    
});