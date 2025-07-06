import 'package:flutter/material.dart';
import 'package:mychatme/screens/home_screen.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:mychatme/screens/verify_email_screen.dart';


class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  bool showPassword = false;
  bool showConfirmPassword = false;

  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  String selectedRole = 'user';

 /* void handleRegister() {
    if (_formKey.currentState!.validate()) {
      // Aquí se puede agregar lógica para guardar usuario (BD/Firebase)

      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (_) => HomeScreen(
            userName: _nameController.text.trim(),
            userRole: selectedRole,
          ),
        ),
      );
    }
  }*/
  //Autenticacion cuenta
   void handleRegister() async {
    String email = _emailController.text.trim();
    String password = _passwordController.text.trim();
    String confirmPassword = _confirmPasswordController.text.trim();

    if (password != confirmPassword) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Las contraseñas no coinciden')),
      );
      return;
    }

    try {
      UserCredential userCredential = await FirebaseAuth.instance.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );

      await userCredential.user?.sendEmailVerification();

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Correo de verificación enviado')),
      );

      // Navegar a pantalla para verificar email
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (_) => VerifyEmailScreen()),
      );

    } on FirebaseAuthException catch (e) {
      String message = "Error al registrar usuario";
      if (e.code == 'email-already-in-use') {
        message = "El correo ya está en uso";
      }
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(message)));
    }
  }



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: BackButton(onPressed: () => Navigator.pop(context)),
        title: const Text("Crear cuenta"),
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        elevation: 0,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              const Text(
                "Crea tu cuenta nueva",
                style: TextStyle(fontSize: 18),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 24),

              // Nombre
              TextFormField(
                controller: _nameController,
                decoration: const InputDecoration(
                  labelText: "Nombre",
                  prefixIcon: Icon(Icons.person),
                  border: OutlineInputBorder(),
                ),
                validator: (value) => value!.isEmpty ? "Campo requerido" : null,
              ),

              const SizedBox(height: 16),

              // Correo
              TextFormField(
                controller: _emailController,
                decoration: const InputDecoration(
                  labelText: "Correo electrónico",
                  prefixIcon: Icon(Icons.email),
                  border: OutlineInputBorder(),
                ),
                validator: (value) => value!.isEmpty ? "Campo requerido" : null,
              ),

              const SizedBox(height: 16),

              // Contraseña
              TextFormField(
                controller: _passwordController,
                obscureText: !showPassword,
                decoration: InputDecoration(
                  labelText: "Contraseña",
                  prefixIcon: const Icon(Icons.lock),
                  suffixIcon: IconButton(
                    icon: Icon(
                      showPassword ? Icons.visibility_off : Icons.visibility,
                    ),
                    onPressed: () => setState(() => showPassword = !showPassword),
                  ),
                  border: const OutlineInputBorder(),
                ),
                validator: (value) => value!.length < 6 ? "Mínimo 6 caracteres" : null,
              ),

              const SizedBox(height: 16),

              // Confirmar contraseña
              TextFormField(
                controller: _confirmPasswordController,
                obscureText: !showConfirmPassword,
                decoration: InputDecoration(
                  labelText: "Confirmar contraseña",
                  prefixIcon: const Icon(Icons.lock_outline),
                  suffixIcon: IconButton(
                    icon: Icon(
                      showConfirmPassword ? Icons.visibility_off : Icons.visibility,
                    ),
                    onPressed: () => setState(() => showConfirmPassword = !showConfirmPassword),
                  ),
                  border: const OutlineInputBorder(),
                ),
                validator: (value) => value != _passwordController.text
                    ? "Las contraseñas no coinciden"
                    : null,
              ),

              const SizedBox(height: 16),

              // Rol
              DropdownButtonFormField<String>(
                value: selectedRole,
                items: const [
                  DropdownMenuItem(value: "user", child: Text("Usuario")),
                  DropdownMenuItem(value: "admin", child: Text("Administrador")),
                ],
                onChanged: (value) => setState(() => selectedRole = value!),
                decoration: const InputDecoration(
                  labelText: "Rol",
                  prefixIcon: Icon(Icons.person_add),
                  border: OutlineInputBorder(),
                ),
              ),

              const SizedBox(height: 24),

              // Botón de crear cuenta
              ElevatedButton(
                onPressed: handleRegister,
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  backgroundColor: const Color.fromARGB(255, 169, 117, 179),
                ),
                child: const Text("Crear cuenta"),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
