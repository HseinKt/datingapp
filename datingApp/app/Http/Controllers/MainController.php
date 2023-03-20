<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;


class MainController extends Controller
{
    function login(Request $request){
        $email = $request->email_postman;
        $password = $request->password_postman;

        return response()->json([
            "email" => "$email",
            "password" => "$password",
        ]);
    }
}