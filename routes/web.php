<?php

use App\Http\Controllers\DailyInfoController;
use App\Http\Controllers\MealController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserInfoController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect('/daily_info');
});

Route::get('/dashboard', function () {
    return redirect('/daily_info');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/userinfo', [UserInfoController::class, 'show'])->name('userinfo.show');
    Route::get('/userinfo/create', [UserInfoController::class, 'create'])->name('userinfo.create');
    Route::post('/userinfo', [UserInfoController::class, 'store'])->name('userinfo.store');
    Route::post('/userinfo', [UserInfoController::class, 'initialStore'])->name('userinfo.initial');
    Route::get('/userinfo/edit', [UserInfoController::class, 'edit'])->name('userinfo.edit');
    Route::put('/userinfo/{userInfo}', [UserInfoController::class, 'update'])->name('userinfo.update');

    Route::get('/daily_info/all', [DailyInfoController::class, 'index'])->name('daily_info.index');
    Route::get('/daily_info', [DailyInfoController::class, 'showLatest'])->name('daily_info.showLatest');

    Route::get('/meals/{meal}/recalculate', [MealController::class, 'recalculateShow'])->name('meals.recalculateShow');
    Route::put('/meals/{meal}/recalculate', [MealController::class, 'recalculate'])->name('meals.recalculate');
    Route::get('/meals/statistics', [MealController::class, 'statistics'])->name('meals.statistics');
    Route::resource('meals', MealController::class)->except(['destroy']);


    Route::get('/onboarding', [OnboardingController::class, 'index'])->name('onboarding');
    Route::post('/onboarding/complete', [OnboardingController::class, 'complete'])->name('onboarding.complete');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
