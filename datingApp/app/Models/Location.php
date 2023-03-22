<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'address',
        'city',
        'state',
        'user_id',
        'created_at',
        'updated_at',
    ];
}

