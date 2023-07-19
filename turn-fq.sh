
#!/bin/bash
f=PRJNA234437
for i in /data/metag_data/qiime2-16s/$f/sra/SRR*
do 

       fastq-dump --gzip --split-3 $i  --outdir /data/metag_data/qiime2-16s/$f/fastq
done




