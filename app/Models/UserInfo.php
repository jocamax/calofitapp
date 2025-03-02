<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserInfo extends Model
{
    /** @use HasFactory<\Database\Factories\UserInfoFactory> */
    use HasFactory;
    protected $fillable = [
        'user_id',
        'age',
        'gender',
        'weight',
        'height',
        'bmi',
        'bmr',
        'activity_level',
        'goal',
        'calorie_needed',
        'weekly_weight_goal'
    ];

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($userStats) {
            $userStats->bmi = self::calculateBMI($userStats->weight, $userStats->height);
            $userStats->bmr = self::calculateBMR($userStats->weight, $userStats->height, $userStats->age, $userStats->gender);
            $userStats->calorie_needed = self::calculateCalorieNeed($userStats->bmr, $userStats->activity_level, $userStats->goal);
        });
    }

    // BMI Calculation
    public static function calculateBMI($weight, $height)
    {
        return $height > 0 ? $weight / pow(($height / 100), 2) : null;
    }

    public static function calculateBMR($weight, $height, $age, $gender)
    {
        if ($gender === 'male') {
            return (10 * $weight) + (6.25 * $height) - (5 * $age) + 5;
        } else {
            return (10 * $weight) + (6.25 * $height) - (5 * $age) - 161;
        }
    }

    public static function calculateCalorieNeed($bmr, $activity_level, $goal)
    {
        $activity_multipliers = [
            'sedentary' => 1.2,
            'lightly_active' => 1.375,
            'moderately_active' => 1.55,
            'very_active' => 1.725,
            'extremely_active' => 1.9,
        ];

        $tdee = $bmr * ($activity_multipliers[$activity_level] ?? 1.2);

        return match ($goal) {
            'lose_weight' => $tdee - 400,
            'gain_weight' => $tdee + 400,
            default => $tdee,
        };
    }

    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }

}
