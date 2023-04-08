import 'package:flutter/material.dart';

// function to trigger build when the app is run
void main() {
  runApp(MaterialApp(
    initialRoute: '/',
    routes: {
      '/': (context) => const Login(),
      //'/second': (context) => const SecondRoute(),
      '/third': (context) => const ThirdRoute(),
      //'/login': (context) => const Login(),
      '/fourth': (context) => const FourthRoute(),
    },
  ));
}

class Login extends StatelessWidget {
  const Login({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Container(
      decoration: BoxDecoration(
          image: DecorationImage(
              image: AssetImage('../asset/images/background2.jpg'))),
      child: MyStatefulWidget(),
    ));
  }
}

class MyStatefulWidget extends StatefulWidget {
  const MyStatefulWidget({Key? key}) : super(key: key);

  @override
  State<MyStatefulWidget> createState() => _MyStatefulWidgetState();
}

class _MyStatefulWidgetState extends State<MyStatefulWidget> {
  TextEditingController nameController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: const EdgeInsets.all(10),
        child: ListView(
          children: <Widget>[
            Container(
                alignment: Alignment.center,
                padding: const EdgeInsets.all(10),
                child: const Text(
                  'Smart Parent',
                  style: TextStyle(
                      color: Colors.blue,
                      fontWeight: FontWeight.w500,
                      fontSize: 30),
                )),
            Container(
                alignment: Alignment.center,
                padding: const EdgeInsets.all(10),
                child: const Text(
                  'Sign in',
                  style: TextStyle(fontSize: 20),
                )),
            Container(
              padding: const EdgeInsets.all(10),
              child: TextField(
                controller: nameController,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'User Name',
                ),
              ),
            ),
            Container(
              padding: const EdgeInsets.fromLTRB(10, 10, 10, 0),
              child: TextField(
                obscureText: true,
                controller: passwordController,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Password',
                ),
              ),
            ),
            TextButton(
              onPressed: () {
                //forgot password screen
              },
              child: const Text(
                'Forgot Password',
              ),
            ),
            Container(
                height: 50,
                padding: const EdgeInsets.fromLTRB(10, 0, 10, 0),
                child: ElevatedButton(
                  child: const Text('Login'),
                  onPressed: () {
                    Navigator.pushNamed(context, '/third');
                    //print(nameController.text);
                    //print(passwordController.text);
                  },
                )),
          ],
        ));
  }
}

//class SecondRoute extends StatelessWidget {
//  const SecondRoute({Key? key}) : super(key: key);
//
//  @override
//  Widget build(BuildContext context) {
//    return Scaffold(
//      appBar: AppBar(
//        title: const Text("Signup"),
//        backgroundColor: Colors.blueAccent,
//      ), // AppBar
//      body: Center(
//        child: ElevatedButton(
//          onPressed: () {
//            Navigator.pop(context);
//          },
//          child: const Text('Back!'),
//        ), // ElevatedButton
//      ), // Center
//    ); // Scaffold
//  }
//}

class ThirdRoute extends StatelessWidget {
  const ThirdRoute({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Container(
      decoration: BoxDecoration(
          image: DecorationImage(
              image: AssetImage('../asset/images/background2.jpg'),
              fit: BoxFit.cover)),
      child: OTP(),
    ));
  }
}

class OTP extends StatefulWidget {
  const OTP({Key? key}) : super(key: key);

  @override
  State<OTP> createState() => _OTP();
}

class _OTP extends State<OTP> {
  //TextEditingController nameController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: ListView(children: <Widget>[
        Container(
            alignment: Alignment.center,
            padding: const EdgeInsets.all(10),
            child: const Text(
              'TutorialKart',
              style: TextStyle(
                  color: Colors.blue,
                  fontWeight: FontWeight.w500,
                  fontSize: 30),
            )),
        Container(
          padding: const EdgeInsets.fromLTRB(10, 10, 10, 0),
          child: TextField(
            obscureText: true,
            controller: passwordController,
            decoration: const InputDecoration(
              border: OutlineInputBorder(),
              labelText: 'OTP',
            ),
          ),
        ),
        Container(
            height: 70,
            padding: const EdgeInsets.all(10),
            child: ElevatedButton(
              child: const Text('Submit'),
              onPressed: () {
                Navigator.pushNamed(context, '/fourth');
                //print(nameController.text);
                //print(passwordController.text);
              },
            ))
      ]),
    );
  }
}

class FourthRoute extends StatelessWidget {
  const FourthRoute({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Container(
      decoration: const BoxDecoration(
          image: DecorationImage(
              image: AssetImage('../asset/images/background2.jpg'),
              opacity: 0.5,
              fit: BoxFit.cover)),
      child: Landing(),
    ));
  }
}

class Landing extends StatefulWidget {
  const Landing({Key? key}) : super(key: key);

  @override
  State<Landing> createState() => _Landing();
}

class _Landing extends State<Landing> {
  //TextEditingController nameController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: ListView(children: <Widget>[
        Container(
            alignment: Alignment.center,
            padding: const EdgeInsets.all(10),
            child: const Text(
              'Smart Parent',
              style: TextStyle(
                  color: Colors.blue,
                  fontWeight: FontWeight.w500,
                  fontSize: 30),
            )),
        Container(
          padding: EdgeInsets.symmetric(horizontal: 20),
          height: 590,
          alignment: Alignment.center,
          child: const Text(
            "Welcome to Smart Parent. Before you can start using our app, you must read and agree to the following terms and conditions:\nPrivacy Policy:\nOur Privacy Policy outlines how we collect, use, and share your personal information, such as your name, email address, and activity data. By using our app, you agree to the terms outlined in our Privacy Policy.\nUser Agreement:\nOur User Agreement outlines the rules and guidelines for using our app, including prohibited activities and our right to terminate your account if you violate these rules. By using our app, you agree to the terms outlined in our User Agreement.\nAccess to Device Data:\nOur app requires access to certain device data, such as GPS location, device ID, and other information necessary for the app to function properly. By using our app, you agree to grant us access to this data.\nData Collection and Use:\nOur app collects and uses data about your physical activity, such as steps taken, calories burned, and distance traveled. This data may be shared with third-party partners. By using our app, you agree to the terms outlined in our Data Collection and Use policy.\nTermination and Suspension:\nWe reserve the right to terminate or suspend your account for any reason, including violation of our User Agreement. By using our app, you agree to the consequences of such termination or suspension.\nIntellectual Property Rights:\nWe own any intellectual property related to our app, such as trademarks, logos, and copyrights. By using our app, you agree to respect our intellectual property rights.\nIndemnification:\nYou agree to indemnify us and our affiliates from any claims or damages arising from your use of our app.\nLimitation of Liability:\nWe are not liable for any damages or losses resulting from your use of our app. By using our app, you agree to our Limitation of Liability policy.",
            style: TextStyle(color: Colors.black, fontWeight: FontWeight.w200),
          ),
        ),
        Container(
            height: 70,
            padding: const EdgeInsets.all(10),
            child: ElevatedButton(
              child: const Text('Enable'),
              onPressed: () {
                //print(nameController.text);
                //print(passwordController.text);
              },
            ))
      ]),
    );
  }
}
