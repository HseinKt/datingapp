<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'description',
        'age',
        'gender',
        'user_id',
        'created_at',
        'updated_at',
    ];

}
