<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Profile;
use App\Models\Location;
use App\Models\Picture;
use App\Models\Favorite;
use App\Models\Message;


class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
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

    public function editProfile(Request $request) 
    {
        $user = Auth::user();
        if($user) 
        {
            if($request->name == '' || $request->description == '' || $request->age == '' || $request->gender == '' || $request->address == '' || $request->city == '' || $request->state == '' || $request->img == ''){
                return response()->json([
                    'status' => 'please make sure all the data are filled in',
                ]);
            }

            $users = User::updateOrCreate(
                ['id' => $user->id],
                ['name' => $request->name]
            );
            $profile = Profile::updateOrCreate(
                ['user_id' => $user->id],
                ['description' => $request->description, 'age' => $request->age, 'gender' => $request->gender]
            );
            $location = Location::updateOrCreate(
                ['user_id' => $user->id],
                ['address' => $request->address, 'city' => $request->city, 'state' => $request->state]
            );
            $image = Picture::updateOrCreate(
                ['user_id' => $user->id],
                ['img' => $request->img]
            );
            return response()->json([
                'status' => 'Success',
                'message' => 'your profile was updated successfully',
                'name' => $user->name,
                'user_name' => $users->name,
                'profile' => $profile,
                'location' => $location,
                'image' => $image,
            ], 200);
        }else {
            return response()->json([
                'status' => 'Error',
                'message' => 'Unauthorized',
            ], 401);
        }
    }

    public function getProfileDetails(Request $request) 
    {
        $user = Auth::user();
        if($user){
            $profile = Profile::select('profiles.description', 'profiles.age', 'profiles.gender', 'locations.address', 'locations.city', 'locations.state', 'pictures.img')
                ->join('locations', 'profiles.user_id', '=', 'locations.user_id')
                ->join('pictures', 'profiles.user_id', '=', 'pictures.user_id')
                ->where('profiles.user_id', $user->id)
                ->first();

            return response()->json([
                'status' => 'Success',
                'name' => $user->name,
                'age' => $profile->age,
                'description' => $profile->description,
                'gender' => $profile->gender,
                'address' => $profile->address,
                'city' => $profile->city,
                'state' => $profile->state,
                'image' => $profile->img
            ], 200);
        }else {
            return response()->json([
                'status' => 'Error',
                'message' => 'Unauthorization'
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
        ], 200);
    }

    public function getUserbyAge(Request $request)
    {
        $user = Auth::user();
        $users = DB::table('users')
                    ->join('profiles', 'profiles.user_id', '=', 'users.id')
                    ->where('profiles.age',$request->age)
                    ->select('users.name')
                    ->get();
        
        return response()->json([
            'status' => 'success',
            'message' => 'user founded',
            'users' => $users,
        ], 200);
    }

    public function setLocation(Request $request) 
    {
        $user = Auth::user();
        $location = Location::updateOrCreate(
            ['user_id' => $user->id],
            ['address' => $request->address, 'city' => $request->city,'state' => $request->state],
        );
       
        return response()->json([
            'status' => 'success',
            'message' => 'user founded',
            'location' => $location,
        ], 200);
    }

    public function getUserbyLocation(Request $request) 
    {
        // $users = Location::where('city',$request->city)->get();
        $users = DB::table('users')
                    ->join('locations', 'locations.user_id','=', 'users.id')
                    ->where('locations.city',$request->city)
                    ->select('users.name')
                    ->get();

        $city = $request->city;
        return response()->json([
            'status' => 'success',
            'message' => 'user founded',
            'city' => $city,
            'users' => $users,
        ], 200);
    }

    public function getUserbyName(Request $request)
    {
        $users = User::where('name',$request->name)->get();
        
        return response()->json([
            'status' => 'success',
            'message' => 'user founded',
            'users' => $users,
        ], 200);
    }

    public function addImage(Request $request) 
    {
        $user = Auth::user();
        $image = $request->file('image');

        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        //convert image to base64
        $base64Image = base64_encode(Image::make($image)->encode('jpeg'));

        //save image to database
        $picture = Picture::create([
            'user_id' => $user->id,
            'img' => $base64Image, 
        ]);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Image uploaded and saved to database',
            'base64Image' => $base64Image,
        ], 200);
    }

    public function addFavorite(Request $request) 
    {
        $user = Auth::user();
        $active = 1;
        $source_id = $user->id;
        $dest_id  = $request->dest_id ;

        if ($source_id != $dest_id) 
        {
            $check1 = Favorite::where('active',0)
                            ->where('source_id',$source_id)
                            ->where('dest_id',$dest_id)
                            ->update(['active' => $active]);
            $check2 = Favorite::where('active',2)
                            ->where('source_id',$source_id)
                            ->where('dest_id',$dest_id)
                            ->update(['active' => $active]);

            if( $check1 == 0 && $check2 ==0)
            {
                $favorite = Favorite::updateOrCreate(
                    ['active' => 1, 'source_id' => $source_id, 'dest_id' => $dest_id],
                    ['active' => $active],
                );
            }
            return response()->json([
                'status' => 'success',
                'message' => 'added user favorite',
                'favorite' => $favorite,
            ], 200);
        }
        else 
        {
            return response()->json([
                'status' => 'error',
                'message' => 'this is the same user',
            ], 401);
        }
    }
    
    public function removeFavoriteOrBlock(Request $request) 
    {
        $user = Auth::user();
        $active = 0;
        $source_id = $user->id;
        $dest_id  = $request->dest_id;

        $favorite = Favorite::where('active',1)
                            ->where('source_id',$source_id)
                            ->where('dest_id',$dest_id)
                            ->update(['active' => $active]);
        $favorite = Favorite::where('active',2)
                            ->where('source_id',$source_id)
                            ->where('dest_id',$dest_id)
                            ->update(['active' => $active]);
        return response()->json([
                'status' => 'success',
                'message' => 'removed user favorite',
                'favorite' => $favorite,
        ], 200);
    }

    public function addBlock(Request $request) 
    {
        $user = Auth::user();
        $active = 2;
        $source_id = $user->id;
        $dest_id  = $request->dest_id ;
        $id = $request->id;

        if ($source_id != $dest_id) 
        {
            $check1 = Favorite::where('active',0)
                            ->where('source_id',$source_id)
                            ->where('dest_id',$dest_id)
                            ->update(['active' => $active]);
            $check2 = Favorite::where('active',1)
                            ->where('source_id',$source_id)
                            ->where('dest_id',$dest_id)
                            ->update(['active' => $active]);
            if( $check1 == 0 && $check2 ==0)
            {
                $block = Favorite::updateOrCreate(
                    ['active' => 2, 'source_id' => $source_id, 'dest_id' => $dest_id],
                    ['active' => $active],
                );
            }
            return response()->json([
                'status' => 'success',
                'message' => 'added user block',
                'block' => $block,
            ], 200);
        }
        else 
        {
            return response()->json([
                'status' => 'error',
                'message' => 'this is the same user',
            ], 401);
        }
    }

    public function sendMessage(Request $request) 
    {
        $user = Auth::user();
        $source_id = $user->id;
        $dest_id  = $request->receiver_id;
        $sender_name = $user->name;
        $receiver_name = User::where('id',$dest_id)->value('name');

        if ($source_id != $dest_id) 
        {
            $message = Message::create([
                'body' => $request->body,
                'sender_id' => $source_id,
                'receiver_id' => $dest_id,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'added user favorite',
                'sender_name' => $sender_name,
                'receiver_name' => $receiver_name,
                'user_message' => $message
            ], 200);
        }
        else 
        {
            return response()->json([
                'status' => 'error',
                'message' => 'this is the same user',
            ], 401);
        }
    }

    public function getMessages(Request $request)
    {
        $user = Auth::user();
        $source_id = $user->id;
        $dest_id  = $request->receiver_id;
        $sender_name = $user->name;
        $receiver_name = User::where('id',$dest_id)->value('name');

        $message = Message::where('receiver_id',$source_id)
                            ->where('sender_id',$dest_id)
                            ->get();

        return response()->json([
            'status' => 'success',
            'message' => 'messages founded',
            'sender_name' => $receiver_name,
            'receiver_name' => $sender_name,
            'user_message' => $message
        ], 200);
    }
    
}
