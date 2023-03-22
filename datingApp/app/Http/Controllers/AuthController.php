<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Profile;
use App\Models\Location;


class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register','EditProfile','getAllUsers','getUserbyAge','setLocation','getUserbyLocation']]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();
        return response()->json([
                'status' => 'success',
                'user' => $user,
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ]);

    }

    public function register(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = Auth::login($user);
        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

    public function EditProfile(Request $request)
    {
        $user = Auth::user();
        if ($user) {
            //$found_user = User::where('id',$user->id)->first();
            $profile = Profile::updateOrCreate(
                ['user_id' => $request->user_id],
                ['description' => $request->description, 'age' => $request->age,'gender' => $request->gender],
            );
            return response()->json([
                'status' => 'success',
                'message' => 'profile updates successfully',
                'profile' => $profile,
            ]);
        }else {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }
    }

    public function getAllUsers(Request $request)
    {
        $users = User::all();
        
        return response()->json([
            'status' => 'success',
            'message' => 'user founded',
            'users' => $users,
        ]);
    }

    public function getUserbyAge(Request $request)
    {
        $users = Profile::where('age',$request->age)->get();
        
        return response()->json([
            'status' => 'success',
            'message' => 'user founded',
            'users' => $users,
        ]);
    }

    public function setLocation(Request $request) 
    {
        $users = Location::updateOrCreate(
            ['user_id' => $request->user_id],
            ['address' => $request->address, 'city' => $request->city,'state' => $request->state],
        );
       
        return response()->json([
            'status' => 'success',
            'message' => 'user founded',
            'users' => $users,
        ]);
    }

    

}

// foreach ($users as $u) 
//         {
//             var_dump($u->name);
//         }