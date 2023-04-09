import 'package:flutter_background/flutter_background.dart';

void startBackgroundTask() {
  FlutterBackground.initialize(backgroundTask);
  FlutterBackground.executeTask(backgroundTask);
}

void backgroundTask() {}
