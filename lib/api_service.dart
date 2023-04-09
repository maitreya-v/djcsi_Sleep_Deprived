import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiService {
  static final String apiUrl = 'http://your-django-api-url.com';

  static Future<http.Response> get(String endpoint) async {
    var url = apiUrl + endpoint;
    var response = await http.get(Uri.parse(url));
    return response;
  }

  static Future<http.Response> post(
      String endpoint, Map<String, dynamic> data) async {
    var url = apiUrl + endpoint;
    var response = await http.post(Uri.parse(url), body: data);
    return response;
  }

  static Future<http.Response> put(
      String endpoint, Map<String, dynamic> data) async {
    var url = apiUrl + endpoint;
    var response = await http.put(Uri.parse(url), body: data);
    return response;
  }

  static Future<http.Response> delete(String endpoint) async {
    var url = apiUrl + endpoint;
    var response = await http.delete(Uri.parse(url));
    return response;
  }
}
