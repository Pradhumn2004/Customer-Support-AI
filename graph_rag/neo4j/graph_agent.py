from neo4j import GraphDatabase
from backend.app.core.config import get_settings
from typing import List, Optional

settings = get_settings()


class GraphRAGAgent:
    def __init__(self):
        self.driver = GraphDatabase.driver(
            settings.NEO4J_URI,
            auth=(settings.NEO4J_USERNAME, settings.NEO4J_PASSWORD)
        )

    def close(self):
        self.driver.close()

    def get_customer_issues(self, customer_id: str) -> List[dict]:
        query = """
        MATCH (c:Customer {id: $cid})-[:PURCHASED]->(p:Product)
              -[:HAS_ISSUE]->(i:Issue)-[:SOLVED_BY]->(s:Solution)
        RETURN p.name AS product, i.description AS issue, s.steps AS solution
        """
        with self.driver.session() as session:
            result = session.run(query, cid=customer_id)
            return [record.data() for record in result]

    def get_product_solutions(self, product_name: str) -> List[dict]:
        query = """
        MATCH (p:Product {name: $pname})-[:HAS_ISSUE]->(i:Issue)-[:SOLVED_BY]->(s:Solution)
        RETURN i.description AS issue, s.steps AS solution
        """
        with self.driver.session() as session:
            result = session.run(query, pname=product_name)
            return [record.data() for record in result]

    def get_related_issues(self, issue_description: str) -> List[dict]:
        query = """
        MATCH (i:Issue)
        WHERE i.description CONTAINS $keyword
        MATCH (i)-[:SOLVED_BY]->(s:Solution)
        RETURN i.description AS issue, s.steps AS solution
        LIMIT 5
        """
        keyword = issue_description.split()[0] if issue_description else ""
        with self.driver.session() as session:
            result = session.run(query, keyword=keyword)
            return [record.data() for record in result]

    def query_graph(self, cypher_query: str, params: Optional[dict] = None) -> List[dict]:
        with self.driver.session() as session:
            result = session.run(cypher_query, **(params or {}))
            return [record.data() for record in result]


graph_agent = GraphRAGAgent()
