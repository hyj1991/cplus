#include <iostream>

char* getname();
char* getname2();

int main() {
  using namespace std;
  char* str = getname();
  cout << str << " " << (int*) str << endl;
  char* str2 = getname2();
  cout << str2 << " " << (int*) str2 << endl;
}

char* getname() {
  char tmp[4];
  tmp[0] = 'a';
  tmp[1] = 'b';
  tmp[2] = 'c';
  tmp[3] = '\0';
  return tmp;
}

char* getname2() {
  char tmp[4];
  tmp[0] = 'a';
  tmp[1] = 'b';
  tmp[2] = 'c';
  tmp[3] = '\0';
  // strlen do not calculat '\0'
  char* p = new char[strlen(tmp) + 1];
  std::cout << "tmp length: " << strlen(tmp) << std::endl;
  strcpy(p, tmp);
  return p;
}