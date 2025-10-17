<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller {
    public function index(Request $request) {
        $query = Task::where('user_id', auth()->id());

        // Filter by status 
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Sort by deadline
        if ($request->has('sort') && $request->sort === 'deadline') {
            $query->orderBy('deadline', 'asc');
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $tasks = $query->get();

        return response()->json($tasks);
    }

    public function store(Request $request) {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:To Do,In Progress,Done',
            'deadline' => 'nullable|date',
        ]);

        $task = Task::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status,
            'deadline' => $request->deadline,
            'created_by' => auth()->user()->name,
        ]);

        return response()->json($task, 201);
    }

    public function show($id) {
        $task = Task::where('task_id', $id)
            ->where('user_id', auth()->id())
            ->first();

        if (!$task) {
            return response()->json(['error' => 'Task not found'], 404);
        }

        return response()->json($task);
    }

    public function update(Request $request, $id) {
        $task = Task::where('user_id', auth()->id())
            ->where('task_id', $id)
            ->first();

        if (!$task) {
            return response()->json(['error' => 'Task not found'], 404);
        }

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|required|in:To Do,In Progress,Done',
            'deadline' => 'nullable|date',
        ]);

        $task->update($request->only(['title', 'description', 'status', 'deadline']));

        return response()->json($task);
    }

    public function destroy($id) {
        $task = Task::where('user_id', auth()->id())
            ->where('task_id', $id)
            ->first();

        if (!$task) {
            return response()->json(['error' => 'Task not found'], 404);
        }

        $task->delete();

        return response()->json(['message' => 'Task deleted successfully']);
    }
}
