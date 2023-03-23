<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Profile;
use App\Models\Location;
use App\Models\Picture;
use App\Models\Favorite;


class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => [
            'login','register','EditProfile',
            'getAllUsers','getUserbyAge','setLocation',
            'getUserbyLocation','getUserbyName','addImage',
            'addFavorite','removeFavorite'
            ]]);
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

    public function getUserbyLocation(Request $request) 
    {
        $users = Location::where('city',$request->city)->get();
        $city = $request->city;
        return response()->json([
            'status' => 'success',
            'message' => 'user founded',
            'city' => $city,
            'users' => $users,
        ]);
    }

    public function getUserbyName(Request $request)
    {
        $users = User::where('name',$request->name)->get();
        
        return response()->json([
            'status' => 'success',
            'message' => 'user founded',
            'users' => $users,
        ]);
    }

    public function addImage(Request $request) 
    {
        $users = Picture::create([
            'user_id' => $request->user_id,
            'img' => $request->img, 
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'picture added',
            'users' => $users,
        ]);
    }

    public function addFavorite(Request $request) 
    {
        $active = 1;
        $source_id = $request->source_id;
        $dest_id  = $request->dest_id ;

        if ($source_id != $dest_id) 
        {
            $users = Favorite::create([
                'active' => $active,
                'source_id' => $source_id, 
                'dest_id' => $dest_id, 
            ]);
           
            return response()->json([
                'status' => 'success',
                'message' => 'added user favorite',
                'users' => $users,
            ]);
        }
        else {
            return response()->json([
                'status' => 'error',
                'message' => 'this is the same user',
            ]);
        }
    }
    
    public function removeFavorite(Request $request) 
    {
        $active = 0;
        $source_id = $request->source_id;
        $dest_id  = $request->dest_id ;

        if ($source_id != $dest_id) 
        {
            $users = Favorite::create([
                'active' => $active,
                'source_id' => $source_id, 
                'dest_id' => $dest_id, 
            ]);
           
            return response()->json([
                'status' => 'success',
                'message' => 'removed user favorite',
                'users' => $users,
            ]);
        }else {
            return response()->json([
                'status' => 'error',
                'message' => 'this is the same user',
            ]);
        }
    }
    
}

