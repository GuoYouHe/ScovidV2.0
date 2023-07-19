#!/bin/bash
cd /data_alluser/web/laryngeal_cancer/qiime2_data/laryngeal_cancer/fastq
echo "sample-id\tabsolute-filepath\tdirection" >> all_sample.txt;
for i in *_R1.fastq.gz;
do 
i=${i%_R1.fastq.gz};
echo "${i}\t`pwd`/${i}_R1.fastq.gz\tforward" >> all_sample.txt;
echo "${i}\t`pwd`/${i}_R2.fastq.gz\treverse" >> all_sample.txt;
done



