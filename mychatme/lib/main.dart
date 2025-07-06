import 'package:flutter/material.dart';
import 'package:mychatme/screens/login_screen.dart';
import 'package:mychatme/screens/register_screen.dart';


void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  State<MyApp> createState() => _MyAppState();
}

enum Language { es, en }

class _MyAppState extends State<MyApp> {
  Language currentLanguage = Language.es;

  final Map<Language, Map<String, String>> texts = {
    Language.es: {
      'welcome': 'Bienvenido',
      'login': 'Iniciar Sesión',
      'register': 'Registrarse',
      'language': 'Idioma',
    },
    Language.en: {
      'welcome': 'Welcome',
      'login': 'Login',
      'register': 'Register',
      'language': 'Language',
    },
  };

  void changeLanguage(Language lang) {
    setState(() {
      currentLanguage = lang;
    });
  }

  @override
  Widget build(BuildContext context) {
    final t = texts[currentLanguage]!;

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              colors: [Colors.blue, Colors.purple, Colors.pink],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
          ),
          child: SafeArea(
            child: Center(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    // Ícono de burbuja de chat
                    Container(
                      width: 100,
                      height: 100,
                      decoration: BoxDecoration(
                        color: Colors.white24,
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(
                        Icons.message_rounded,
                        color: Colors.white,
                        size: 50,
                      ),
                    ),
                    const SizedBox(height: 24),

                    // Texto de bienvenida
                    Text(
                      t['welcome']!,
                      style: const TextStyle(
                        fontSize: 32,
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),

                    const SizedBox(height: 40),

                    // Botones de login y registro
                    Builder(
                      builder: (context){
                        return ElevatedButton(
                          onPressed: () {
                            print("Boton login presionado");
                            // Aquí irá la navegación a login
                            Navigator.push(
                              context,
                              MaterialPageRoute(builder: (context) => const LoginScreen()),
                            );
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.white,
                            foregroundColor: Colors.purple,
                            padding: const EdgeInsets.symmetric(vertical: 16),
                            minimumSize: const Size(double.infinity, 0),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(30),
                            ),
                          ),
                          child: Text(t['login']!),
                        );
                      },
                    ),

                    const SizedBox(height: 16),

                    Builder(
                      builder: (context) {
                        return OutlinedButton(
                          onPressed: () {
                            // Aquí irá la navegación a registro
                            print("Boton registro presionado");
                            Navigator.push(
                              context,
                              MaterialPageRoute(builder: (_) => const RegisterScreen()),
                            );
                          },
                          style: OutlinedButton.styleFrom(
                            side: const BorderSide(color: Colors.white),
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(vertical: 16),
                            minimumSize: const Size(double.infinity, 0),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(30),
                            ),
                          ),
                          child: Text(t['register']!),
                        );
                      },
                    ),

                    const SizedBox(height: 40),

                    // Botones de idioma
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        TextButton(
                          onPressed: () => changeLanguage(Language.es),
                          child: Text(
                            'ES',
                            style: TextStyle(
                              color: currentLanguage == Language.es
                                  ? Colors.white
                                  : Colors.white54,
                            ),
                          ),
                        ),
                        const SizedBox(width: 10),
                        TextButton(
                          onPressed: () => changeLanguage(Language.en),
                          child: Text(
                            'EN',
                            style: TextStyle(
                              color: currentLanguage == Language.en
                                  ? Colors.white
                                  : Colors.white54,
                            ),
                          ),
                        ),
                      ],
                    )
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
