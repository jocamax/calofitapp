<?php

use App\Http\Controllers\DailyInfoController;
use App\Http\Controllers\MealController;
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

    Route::get('/userinfo/edit', [UserInfoController::class, 'edit'])->name('userinfo.edit');
    Route::put('/userinfo/{userInfo}', [UserInfoController::class, 'update'])->name('userinfo.update');

    Route::get('/daily_info', [DailyInfoController::class, 'index'])->name('daily_info.index');

    Route::resource('meals', MealController::class)->except(['destroy']);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
