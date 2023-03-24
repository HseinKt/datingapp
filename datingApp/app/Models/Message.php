<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'body',
        'sender_id',
        'receiver_id',
        'created_at',
        'updated_at',
    ];
}
