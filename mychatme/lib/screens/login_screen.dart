import 'package:flutter/material.dart';
import 'package:mychatme/screens/home_screen.dart';


class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  bool showPassword = false;
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  /*void handleLogin() {
    String email = _emailController.text.trim();
    String password = _passwordController.text.trim();
    // Aquí puedes agregar lógica de autenticación

    print("Login con: $email y $password");
  }*/
  void handleLogin() {
  String email = _emailController.text.trim();
  String password = _passwordController.text.trim();

  // Simulamos autenticación básica (puedes luego usar Firebase)
  if (email.isNotEmpty && password.isNotEmpty) {
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(
        builder: (_) => const HomeScreen(
          userName: "Miriam Torres", // Aquí puedes usar el nombre real
          userRole: "admin", // Puedes usar "user" también
        ),
      ),
    );
  } else {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text("Por favor, ingresa tus credenciales")),
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
                  icon: Icon(showPassword ? Icons.visibility_off : Icons.visibility),
                  onPressed: () => setState(() => showPassword = !showPassword),
                ),
                border: const OutlineInputBorder(),
              ),
            ),

            const SizedBox(height: 8),
            TextButton(
              onPressed: () {
                // lógica para recuperar contraseña
              },
              child: const Text("¿Olvidaste tu contraseña?"),
            ),

            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: handleLogin,
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 16),
                backgroundColor: Colors.purple,
              ),
              child: const Text("Iniciar sesión"),
            ),

            const SizedBox(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text("¿No tienes una cuenta?"),
                TextButton(
                  onPressed: () {
                    // Navegar a registro
                  },
                  child: const Text("Regístrate"),
                )
              ],
            )
          ],
        ),
      ),
    );
  }
}
