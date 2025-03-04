<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OnboardingController extends Controller
{

    public function index(){
        $user = Auth::user();
        return inertia('Onboarding/Onboarding', [
            'user' => $user
        ]);
    }
    public function complete(Request $request)
    {
        $user = Auth::user();
        $user->update(['is_new' => false]);

        return to_route('daily_info.index');
    }
}
