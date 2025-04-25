from diagrams import Diagram, Cluster
from diagrams.aws.compute import EC2
from diagrams.aws.network import VPC

def generate_architecture_diagram(tf_path):
    with Diagram("Simple Architecture", show=False, filename="output/diagram", outformat="png"):
        with Cluster("VPC"):
            EC2("Instance")
    return "output/diagram.png"
