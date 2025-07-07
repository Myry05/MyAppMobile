import 'package:flutter/material.dart';
import 'package:mychatme/screens/home_screen.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:mychatme/screens/register_screen.dart';
import 'package:mychatme/services/auth_service.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:mychatme/screens/forgot_password_screen.dart';


class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  bool showPassword = false;
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  void handleLogin() async {
    String email = _emailController.text.trim();
    String password = _passwordController.text.trim();

    try {
      UserCredential userCredential = await FirebaseAuth.instance.signInWithEmailAndPassword(
        email: email,
        password: password,
      );

      print("Usuario autenticado: ${userCredential.user?.email}");
      // Navegar a HomeScreen
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => HomeScreen(
            userName: userCredential.user?.email ?? 'Usuario',
            userRole: 'user', // O administra el rol 
          ),
        ),
      );
    } on FirebaseAuthException catch (e) {
      String message = "Error en la autenticación";
      if (e.code == 'user-not-found') {
        message = "No existe usuario con ese correo.";
      } else if (e.code == 'wrong-password') {
        message = "Contraseña incorrecta.";
      }
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(message)));
    }
  }

  void handleGoogleSignIn() async {
    final userCredential = await AuthService().signInWithGoogle();
  
    if (userCredential != null) {
      final user = userCredential.user!;
      final name = user.displayName ?? "Usuario Google";
      final role = "user"; //roles

      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (_) => HomeScreen(
            userName: name,
            userRole: role,
          ),
        ),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Inicio de sesión con Google fallido")),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: BackButton(onPressed: () => Navigator.pop(context)),
        title: const Text("Iniciar Sesión"),
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        elevation: 0,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text(
              "Ingresa a tu cuenta",
              style: TextStyle(fontSize: 18),
              textAlign: TextAlign.center,
            ),

            const SizedBox(height: 16),

             // Botón Google
            ElevatedButton.icon(
              onPressed: handleGoogleSignIn,
              icon: SvgPicture.asset(
                'assets/images/google_logo.svg',
                height: 24,
                width: 24,
              ),
              label: const Text("Iniciar con Google"),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.white,
                foregroundColor: Colors.black,
                minimumSize: const Size(double.infinity, 50),
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(30)),
              ),
            ),

            const SizedBox(height: 24),

            // Email
            TextField(
              controller: _emailController,
              decoration: const InputDecoration(
                labelText: "Correo electrónico",
                prefixIcon: Icon(Icons.mail),
                border: OutlineInputBorder(),
              ),
              keyboardType: TextInputType.emailAddress,
            ),

            const SizedBox(height: 16),

            // Password
            TextField(
              controller: _passwordController,
              obscureText: !showPassword,
              decoration: InputDecoration(
                labelText: "Contraseña",
                prefixIcon: const Icon(Icons.lock),
                suffixIcon: IconButton(
                  icon: Icon(
                      showPassword ? Icons.visibility_off : Icons.visibility),
                  onPressed: () =>
                      setState(() => showPassword = !showPassword),
                ),
                border: const OutlineInputBorder(),
              ),
            ),

            const SizedBox(height: 8),

            TextButton(
              onPressed: () {
                // lógica para recuperar contraseña
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => const ForgotPasswordScreen()),
                );
              },
              child: const Text("¿Olvidaste tu contraseña?"),
            ),

            const SizedBox(height: 16),

            // Botón iniciar sesión con correo y contraseña
            ElevatedButton(
              onPressed: handleLogin,
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 16),
                backgroundColor: const Color.fromARGB(255, 169, 117, 179),
              ),
              child: const Text("Iniciar sesión"),
            ),

            const SizedBox(height: 24),

            // Link a registro
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text("¿No tienes una cuenta?"),
                TextButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) => const RegisterScreen(),
                      ),
                    );
                  },
                  child: const Text("Regístrate"),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}