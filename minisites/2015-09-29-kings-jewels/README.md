Calcualting the outcomes of the King's Jewels Problem:

--number specifies the number of jewels in the bag
--iterations specifies the number of times to run the simulation
-b specifies that we should use the b'th best jewel as our basis for comparison
    (i.e. pick the next best jewel after the b'th best that we've already seen)
-f specifies that the program should output the number of the best picked jewel

num=20; python scripts/jewels.py --number $num --iterations 1000 -f -b 1 > jsons/${num}.json

for i in $(seq 800); do python scripts/jewels.py --number $i --iterations 1000 -b 1; done | tee > output/all_stats.ssv