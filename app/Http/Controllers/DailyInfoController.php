<?php

namespace App\Http\Controllers;

use App\Models\DailyInfo;
use App\Models\Meal;
use App\Models\UserInfo;

class DailyInfoController extends Controller
{
    public function index(){
        $user = auth()->user();
        if($user->is_new){
            return redirect()->route('onboarding');
        }

        $dailyInfo = DailyInfo::where('user_id', auth()->id())->latest()->first();
        if (!$dailyInfo || $dailyInfo->date !== today()->toDateString()) {
            $dailyInfo = DailyInfo::create([
                'user_id' => $user->id,
                'date' => today()->toDateString(),
                'total_calories' => 0,
                'total_fat' => 0, // these are already default but nvm
            ]);
        }
        $userInfo = UserInfo::where('user_id', auth()->id())->get();
        $recentMeals = Meal::where('user_id', auth()->id())->latest()->take(3)->get();

        return inertia('DailyInfos/Index', [
            'dailyInfo' => $dailyInfo,
            'userInfo' => $userInfo,
            'recentMeals' => $recentMeals,
        ]);
    }
}
