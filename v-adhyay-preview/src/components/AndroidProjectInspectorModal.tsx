import React, { useState } from 'react';
import { X, Copy, Check, Folder, FileCode, Shield, Download, Terminal, Layers, ExternalLink } from 'lucide-react';

interface AndroidProjectInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidProjectInspectorModal: React.FC<AndroidProjectInspectorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedFile, setSelectedFile] = useState<string>('MainActivity.kt');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const projectFiles: Record<string, { path: string; category: string; code: string }> = {
    'MainActivity.kt': {
      path: 'android/app/src/main/java/com/vadhyay/app/MainActivity.kt',
      category: 'Entrypoint',
      code: `package com.vadhyay.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import androidx.navigation.compose.rememberNavController
import com.vadhyay.app.navigation.VAdhyayNavGraph
import com.vadhyay.app.ui.theme.VAdhyayTheme

/**
 * V Adhyay - Android Native Main Activity
 * Enforces Material 3, Edge-to-Edge System Bars & MVVM Navigation
 */
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            VAdhyayTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    val navController = rememberNavController()
                    VAdhyayNavGraph(navController = navController)
                }
            }
        }
    }
}`,
    },
    'Theme.kt': {
      path: 'android/app/src/main/java/com/vadhyay/app/ui/theme/Theme.kt',
      category: 'Design System',
      code: `package com.vadhyay.app.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

// V Adhyay Brand Color Tokens (PRD Section 2)
val RoyalBurgundy = Color(0xFF7D202B)
val DarkWine = Color(0xFF461820)
val AntiqueGold = Color(0xFFD6B45B)
val WarmIvory = Color(0xFFFAF7EE)
val StoneGrey = Color(0xFFE9E5E2)
val DeepBlack = Color(0xFF121013)

private val LightColorScheme = lightColorScheme(
    primary = RoyalBurgundy,
    onPrimary = Color.White,
    primaryContainer = DarkWine,
    onPrimaryContainer = AntiqueGold,
    secondary = AntiqueGold,
    onSecondary = DarkWine,
    background = WarmIvory,
    onBackground = DeepBlack,
    surface = Color.White,
    onSurface = DeepBlack,
    surfaceVariant = StoneGrey
)

@Composable
fun VAdhyayTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = LightColorScheme,
        typography = VAdhyayTypography,
        content = content
    )
}`,
    },
    'NavGraph.kt': {
      path: 'android/app/src/main/java/com/vadhyay/app/navigation/NavGraph.kt',
      category: 'Navigation',
      code: `package com.vadhyay.app.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.vadhyay.app.ui.screens.*

sealed class Screen(val route: String) {
    object Login : Screen("login")
    object StudentDashboard : Screen("student_dashboard")
    object TeacherDashboard : Screen("teacher_dashboard")
    object InstituteDashboard : Screen("institute_dashboard")
    object AdminDashboard : Screen("admin_dashboard")
    object LiveClassRoom : Screen("live_classroom/{roomId}") {
        fun createRoute(roomId: String) = "live_classroom/$roomId"
    }
}

@Composable
fun VAdhyayNavGraph(navController: NavHostController) {
    NavHost(
        navController = navController,
        startDestination = Screen.Login.route
    ) {
        composable(Screen.Login.route) {
            LoginScreen(
                onNavigateToStudent = { navController.navigate(Screen.StudentDashboard.route) },
                onNavigateToTeacher = { navController.navigate(Screen.TeacherDashboard.route) },
                onNavigateToInstitute = { navController.navigate(Screen.InstituteDashboard.route) },
                onNavigateToAdmin = { navController.navigate(Screen.AdminDashboard.route) }
            )
        }
        composable(Screen.StudentDashboard.route) {
            StudentDashboardScreen(
                onEnterLiveRoom = { roomId -> navController.navigate(Screen.LiveClassRoom.createRoute(roomId)) },
                onSignOut = { navController.navigate(Screen.Login.route) }
            )
        }
        composable(Screen.TeacherDashboard.route) {
            TeacherDashboardScreen(
                onEnterLiveRoom = { roomId -> navController.navigate(Screen.LiveClassRoom.createRoute(roomId)) }
            )
        }
        composable(Screen.InstituteDashboard.route) {
            InstituteDashboardScreen()
        }
        composable(Screen.AdminDashboard.route) {
            AdminDashboardScreen()
        }
        composable(Screen.LiveClassRoom.route) { backStackEntry ->
            val roomId = backStackEntry.arguments?.getString("roomId") ?: "ROOM_DEFAULT"
            LiveClassRoomScreen(
                roomId = roomId,
                onLeaveRoom = { navController.popBackStack() }
            )
        }
    }
}`,
    },
    'StudentDashboardScreen.kt': {
      path: 'android/app/src/main/java/com/vadhyay/app/ui/screens/StudentDashboardScreen.kt',
      category: 'Student Compose UI',
      code: `package com.vadhyay.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.vadhyay.app.model.Classroom
import com.vadhyay.app.ui.theme.RoyalBurgundy
import com.vadhyay.app.ui.theme.AntiqueGold
import com.vadhyay.app.ui.theme.DarkWine

@Composable
fun StudentDashboardScreen(
    onEnterLiveRoom: (String) -> Unit,
    onSignOut: () -> Unit
) {
    var classroomCodeInput by remember { mutableStateOf("") }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("V Adhyay • Learning Space", fontWeight = FontWeight.Bold) },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.background,
                    titleContentColor = DarkWine
                )
            )
        }
    ) { padding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Rapid Classroom Entry
            item {
                Card(
                    shape = RoundedCornerShape(20.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    elevation = CardDefaults.cardElevation(2.dp)
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text(
                            text = "RAPID CLASSROOM ENTRY",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            color = RoyalBurgundy
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            OutlinedTextField(
                                value = classroomCodeInput,
                                onValueChange = { classroomCodeInput = it },
                                placeholder = { Text("E.G. #CAL-402") },
                                modifier = Modifier.weight(1f),
                                shape = RoundedCornerShape(12.dp)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Button(
                                onClick = { /* Lookup and Join logic */ },
                                colors = ButtonDefaults.buttonColors(containerColor = RoyalBurgundy),
                                shape = RoundedCornerShape(12.dp)
                            ) {
                                Text("Lookup & Join")
                            }
                        }
                    }
                }
            }

            // Imminent Session Banner
            item {
                Card(
                    shape = RoundedCornerShape(24.dp),
                    colors = CardDefaults.cardColors(containerColor = DarkWine)
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text("Room #LIVE-MATH-01", color = AntiqueGold, fontSize = 11.sp, fontWeight = FontWeight.Bold)
                        Text(
                            "Advanced Calculus & Linear Algebra: Stokes Theorem",
                            color = Color.White,
                            fontSize = 15.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Text("Instructor: Dr. A. Sen • Starts at 06:00 PM IST", color = Color.LightGray, fontSize = 12.sp)
                        Spacer(modifier = Modifier.height(12.dp))
                        Button(
                            onClick = { onEnterLiveRoom("LIVE-MATH-01") },
                            colors = ButtonDefaults.buttonColors(containerColor = AntiqueGold),
                            shape = RoundedCornerShape(12.dp),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Text("Enter Live Room", color = DarkWine, fontWeight = FontWeight.Bold)
                        }
                    }
                }
            }
        }
    }
}`,
    },
    'FirebaseRepository.kt': {
      path: 'android/app/src/main/java/com/vadhyay/app/data/FirebaseRepository.kt',
      category: 'Data & Auth',
      code: `package com.vadhyay.app.data

import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.vadhyay.app.model.Classroom
import com.vadhyay.app.model.UserRole
import kotlinx.coroutines.tasks.await

class FirebaseRepository(
    private val auth: FirebaseAuth = FirebaseAuth.getInstance(),
    private val db: FirebaseFirestore = FirebaseFirestore.getInstance()
) {
    suspend fun fetchClassroomById(classroomCode: String): Classroom? {
        val snapshot = db.collection("classrooms")
            .whereEqualTo("code", classroomCode)
            .limit(1)
            .get()
            .await()
        return snapshot.documents.firstOrNull()?.toObject(Classroom::class.java)
    }

    suspend fun submitJoinRequest(classroomId: String, userId: String, role: UserRole) {
        val request = hashMapOf(
            "classroomId" to classroomId,
            "requesterUid" to userId,
            "requestedRole" to role.name,
            "status" to "PENDING",
            "createdAt" to com.google.firebase.Timestamp.now()
        )
        db.collection("join_requests").add(request).await()
    }
}`,
    },
    'firestore.rules': {
      path: 'android/firestore.rules',
      category: 'Security Rules',
      code: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    function isAuthenticated() {
      return request.auth != null;
    }

    function getUserRole() {
      return request.auth.token.role;
    }

    function isSuperAdmin() {
      return isAuthenticated() && getUserRole() == 'SUPER_ADMIN';
    }

    function isAdmin() {
      return isAuthenticated() && (getUserRole() == 'ADMIN' || isSuperAdmin());
    }

    function isInstitute() {
      return isAuthenticated() && (getUserRole() == 'INSTITUTE' || isAdmin());
    }

    // PRD Section 4 & 12: Zero Self-Escalation
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && request.auth.uid == userId
                   && !request.resource.data.diff(resource.data).affectedKeys().hasAny(['role', 'isSuperAdmin']);
    }

    match /classrooms/{classroomId} {
      allow read: if isAuthenticated();
      allow create, update: if isInstitute();
      allow delete: if isSuperAdmin();
    }

    match /join_requests/{requestId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update: if isInstitute() || isAdmin();
    }

    match /payments/{paymentId} {
      allow read: if isAuthenticated() && (request.auth.uid == resource.data.payerUid || isAdmin());
      // Payments can only be written by trusted Cloud Functions / Webhooks
      allow write: if false;
    }
  }
}`,
    },
    'build.gradle.kts (App)': {
      path: 'android/app/build.gradle.kts',
      category: 'Gradle Configuration',
      code: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.google.gms.google.services)
}

android {
    namespace = "com.vadhyay.app"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.vadhyay.app"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildFeatures {
        compose = true
    }
}

dependencies {
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.compose.ui)
    implementation(libs.androidx.compose.material3)
    implementation(libs.androidx.navigation.compose)
    implementation(libs.androidx.lifecycle.viewmodel.compose)
    
    // Firebase BoM
    implementation(platform(libs.firebase.bom))
    implementation(libs.firebase.auth.ktx)
    implementation(libs.firebase.firestore.ktx)
}`,
    },
  };

  const currentFileContent = projectFiles[selectedFile]?.code || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFileContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#1A1619] border border-[#D6B45B]/40 rounded-3xl w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl overflow-hidden text-stone-200">
        
        {/* Header */}
        <div className="px-5 py-4 bg-[#231E22] border-b border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#7D202B] text-white flex items-center justify-center font-bold text-xs">
              KT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white">V Adhyay — Native Android Studio Project</h3>
                <span className="text-[10px] bg-[#D6B45B] text-[#461820] font-black px-2 py-0.5 rounded-full">
                  PRD v1.0
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                Kotlin 2.0 • Jetpack Compose • Material 3 • Navigation Compose • Clean MVVM Architecture
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 bg-[#7D202B] hover:bg-[#631821] text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Pane */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* File Tree Sidebar */}
          <div className="w-full md:w-64 bg-[#141113] border-r border-stone-800 p-3 overflow-y-auto shrink-0">
            <div className="text-[10px] font-bold text-[#D6B45B] uppercase tracking-wider mb-2 px-2 flex items-center gap-1.5">
              <Folder className="w-3.5 h-3.5" />
              <span>Project Structure</span>
            </div>

            <div className="space-y-1">
              {Object.keys(projectFiles).map((fileName) => {
                const item = projectFiles[fileName];
                const isSelected = selectedFile === fileName;
                return (
                  <button
                    key={fileName}
                    onClick={() => setSelectedFile(fileName)}
                    className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex flex-col transition-all ${
                      isSelected
                        ? 'bg-[#7D202B] text-white font-bold shadow-xs'
                        : 'text-stone-400 hover:text-stone-200 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <FileCode className={`w-3.5 h-3.5 ${isSelected ? 'text-[#D6B45B]' : 'text-stone-500'}`} />
                      <span className="truncate">{fileName}</span>
                    </div>
                    <span className={`text-[9px] mt-0.5 truncate ${isSelected ? 'text-stone-200' : 'text-stone-600'}`}>
                      {item.category}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-stone-800/80 px-2 text-[10px] text-stone-500 space-y-1">
              <div>Environment Note:</div>
              <p className="text-stone-400 leading-tight">
                All source files are generated and stored in <span className="font-mono text-[#D6B45B]">/android/</span> in this project repository.
              </p>
            </div>
          </div>

          {/* Code Viewer */}
          <div className="flex-1 bg-[#0E0C0E] p-4 overflow-y-auto font-mono text-xs text-stone-300">
            <div className="text-[10px] text-stone-500 mb-2 pb-2 border-b border-stone-800 flex items-center justify-between">
              <span>{projectFiles[selectedFile]?.path}</span>
              <span className="text-[#D6B45B] font-semibold">{projectFiles[selectedFile]?.category}</span>
            </div>
            <pre className="leading-relaxed whitespace-pre-wrap selection:bg-[#7D202B]">
              {currentFileContent}
            </pre>
          </div>

        </div>

      </div>
    </div>
  );
};
