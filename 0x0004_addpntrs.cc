#include <iostream>

int main(){
  using namespace std;
  double wages[3] = {1000.0, 2000.0, 3000.0};
  short stacks[3] = {3,2,1};

  double* pw = wages;
  short* ps = &stacks[0];

  cout << "pw = " << pw << ", *pw = " << *pw << endl;
  pw = pw + 1;
  cout << "pw = " << pw << ", *pw = " << *pw << endl;
  cout << "ps = " << ps << ", *ps = " << *ps << endl;
  ps = ps + 1;
  cout << "ps = " << ps << ", *ps = " << *ps << endl;

  cout << "access two elements with array notation\n";
  cout << "stacks[0] = " << stacks[0] << ", stacks[1] = " << stacks[1] << endl;
  cout << "access two elements with pointer notation\n";
  cout << "*stacks = " << *stacks << ", *(stacks + 1) = " << *(stacks + 1) << endl;

  cout << sizeof(wages) << " = size of wages array\n";
  cout << sizeof(pw) << " = size of pw pointer\n";
  cout << sizeof(pw) << " = size of pw pointer\n";
  cout << sizeof(int) << " = size of int\n\n";

  cout << "first element' address in wages: &wages[0] = " << &wages[0] << " or wage = " << wages << endl;
  cout << "address with the hole wages: &wages = " << &wages << endl;
  cout << endl;
  return 0;
}