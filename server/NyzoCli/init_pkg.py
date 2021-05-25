import subprocess

process = subprocess.Popen(['python', '-m', 'pip', 'install', '-r', 'requirements.txt'], stdout=subprocess.PIPE)
output, error = process.communicate()
output = output.decode("utf-8").split('\n')
print(output)