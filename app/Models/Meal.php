<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Meal extends Model
{
    /** @use HasFactory<\Database\Factories\MealFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id', 'date', 'calories', 'protein', 'fat', 'carbs', 'description', 'ingredients', 'health_score', 'image_path'
    ];

    public static function boot(){
        parent::boot();

        static::saved(function($meal){
            DailyInfo::updateSummaryForUser($meal->user_id, $meal->date);
        });
        static::deleted(function ($meal) {
            DailyInfo::updateSummaryForUser($meal->user_id, $meal->date);
        });
    }

    public function user():BelongsTo{
        return $this->belongsTo(User::class);
    }
}
