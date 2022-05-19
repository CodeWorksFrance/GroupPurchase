import glob
import os
dir_name = '.'
# Get a list of files (file paths) in the given directory
list_of_files = filter( os.path.isfile,
                        glob.glob(dir_name + '/**/*', recursive=True) )
# Sort list of files in directory by size
list_of_files = sorted( list_of_files,
                        key =  lambda x: os.stat(x).st_size, reverse=True)[0:10]
# Iterate over sorted list of files in directory and
# print them one by one along with size
for elem in list_of_files:
    file_size  = os.stat(elem).st_size
    print(file_size, ' -->', elem)
