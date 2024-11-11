#include <bits/stdc++.h>
using namespace std;
typedef long long int ll;

void file()
{
#ifndef ONLINE_JUDGE
    freopen("input2.txt", "r", stdin);
    freopen("input4.txt", "w", stdout);
#endif
}

string gen_random(const int len) {
    static const char alphanum[] =
        "abcdefghijklmnopqrstuvwxyz";
    std::string tmp_s;
    tmp_s.reserve(len);

    for (int i = 0; i < len; ++i) {
        tmp_s += alphanum[rand() % (sizeof(alphanum) - 1)];
    }
    
    return tmp_s;
}


int main()
{

    file();
    srand(time(0));

    ll t = rand() % 100 + 1;
    assert(t > 0 && t < 1000);
    cout << t << endl;

    while (t--)
    {
        ll n, m;
        n = rand() % 100 + 1;
        m = rand() % 100 + 1;
        assert(n > 0 && n < 100);
        assert(m > 0 && m < 100);
        cout << n << " " << m << endl;
    }

    return 0;
}