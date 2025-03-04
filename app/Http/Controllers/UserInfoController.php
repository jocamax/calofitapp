<?php

namespace App\Http\Controllers;

use App\Models\UserInfo;
use Illuminate\Http\Request;

class UserInfoController extends Controller
{
    public function create()
    {
        return inertia('UserInfos/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'age' => 'required|integer|min:9|max:100',
            'gender' => 'required|in:male,female',
            'weight' => 'required|numeric|min:20|max:200',
            'height' => 'required|numeric|min:80|max:270',
            'activity_level' => 'required|in:sedentary,lightly_active,moderately_active,very_active',
            'goal' => 'required|in:lose_weight,maintain_weight,gain_weight',
        ]);

        $userStats = UserInfo::updateOrCreate(
            ['user_id' => auth()->id()],
            $request->all()
        );

        return to_route('dashboard');
    }

    public function initialStore(Request $request)
    {
        $request->validate([
            'age' => 'required|integer|min:9|max:100',
            'gender' => 'required|in:male,female',
            'weight' => 'required|numeric|min:20|max:200',
            'height' => 'required|numeric|min:80|max:270',
            'activity_level' => 'required|in:sedentary,lightly_active,moderately_active,very_active',
            'goal' => 'required|in:lose_weight,maintain_weight,gain_weight',
        ]);

        $userStats = UserInfo::updateOrCreate(
            ['user_id' => auth()->id()],
            $request->all()
        );

    }

    public function show()
    {
        $userInfo = UserInfo::where('user_id', auth()->id())->firstOrFail();
        return inertia('UserInfos/Show', [
            'userInfo' => $userInfo
        ]);
    }

    public function edit()
    {
        $userInfo = UserInfo::where('user_id', auth()->id())->firstOrFail();

        return inertia('UserInfos/Edit', [
            'userInfo' => $userInfo
        ]);
    }

    public function update(Request $request, UserInfo $userInfo)
    {
        $request->validate([
            'age' => 'required|integer|min:9|max:100',
            'gender' => 'required|in:male,female',
            'weight' => 'required|numeric|min:20|max:200',
            'height' => 'required|numeric|min:80|max:270',
            'activity_level' => 'required|in:sedentary,lightly_active,moderately_active,very_active',
            'goal' => 'required|in:lose_weight,maintain_weight,gain_weight',
        ]);

        $userInfo->update($request->all());

        return to_route('userinfo.show');
    }
}
