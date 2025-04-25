import subprocess

def deploy_terraform():
    try:
        subprocess.run(["terraform", "init"], cwd="terraform", check=True)
        result = subprocess.run(["terraform", "apply", "-auto-approve"], cwd="terraform", capture_output=True, text=True, check=True)
        return result.stdout
    except subprocess.CalledProcessError as e:
        return e.stderr
