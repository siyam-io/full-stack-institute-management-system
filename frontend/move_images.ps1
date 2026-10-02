$src1 = "C:\Users\esthiyak\.gemini\antigravity\brain\98918d63-9a38-4ab8-bfa4-7d248f410890\blog_executive_chef_salary_1777476396633.png"
$src2 = "C:\Users\esthiyak\.gemini\antigravity\brain\98918d63-9a38-4ab8-bfa4-7d248f410890\blog_become_chef_1777476419991.png"
$src3 = "C:\Users\esthiyak\.gemini\antigravity\brain\98918d63-9a38-4ab8-bfa4-7d248f410890\blog_food_business_1777476438740.png"

$dest = "c:\Users\esthiyak\Desktop\cibdhk.com\public\images"

Copy-Item $src1 "$dest\blog-executive-chef-salary.png" -Force
Copy-Item $src2 "$dest\blog-become-chef.png" -Force
Copy-Item $src3 "$dest\blog-food-business.png" -Force
