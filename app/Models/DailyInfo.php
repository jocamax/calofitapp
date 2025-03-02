<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DailyInfo extends Model
{
    /** @use HasFactory<\Database\Factories\DailyInfoFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id', 'date', 'total_calories', 'total_protein',
        'total_fat', 'total_carbs', 'average_health_score'
    ];

    public static function updateSummaryForUser($userId, $date){
        $totals = Meal::where('user_id', $userId)
            ->whereDate('date', $date)
            ->selectRaw('SUM(calories) as total_calories,
                     SUM(protein) as total_protein,
                     SUM(fat) as total_fat,
                     SUM(carbs) as total_carbs,
                     AVG(health_score) as average_health_score')
            ->first();

        DailyInfo::updateOrCreate(
            ['user_id' => $userId, 'date' => $date],
            [
                'total_calories' => $totals->total_calories ?? 0,
                'total_protein' => $totals->total_protein ?? 0,
                'total_fat' => $totals->total_fat ?? 0,
                'total_carbs' => $totals->total_carbs ?? 0,
                'average_health_score' => $totals->average_health_score ?? 0,
            ]
        );

    }

    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }
}
