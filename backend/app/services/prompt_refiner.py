"""
Prompt Refinement Engine for AI Prompt Generator.
Constructs high-performance, structured prompts based on the classified intent category.
"""

import re
from typing import Dict, List, Tuple
from app.schemas import StructuredBreakdown


class PromptRefinerEngine:
    def __init__(self):
        self.category_names = [
            "Coding", "Writing", "Education", "Image Generation", "Data Analysis"
        ]

    def refine_prompt(self, raw_prompt: str, intent: str) -> Tuple[str, StructuredBreakdown, List[str]]:
        """
        Produce a tailored, structured prompt using prompt engineering best practices.
        Returns: (full_markdown_prompt, structured_breakdown, suggestions)
        """
        prompt_clean = raw_prompt.strip()

        if intent == "Coding":
            return self._refine_coding(prompt_clean)
        elif intent == "Writing":
            return self._refine_writing(prompt_clean)
        elif intent == "Education":
            return self._refine_education(prompt_clean)
        elif intent == "Image Generation":
            return self._refine_image(prompt_clean)
        elif intent == "Data Analysis":
            return self._refine_data_analysis(prompt_clean)
        else:
            return self._refine_writing(prompt_clean)

    def _detect_coding_language(self, text: str) -> str:
        t = text.lower()
        langs = [
            ("python", "Python"), ("javascript", "JavaScript"), ("typescript", "TypeScript"),
            ("java", "Java"), ("c++", "C++"), ("c#", "C#"), ("sql", "SQL"),
            ("html", "HTML/CSS"), ("react", "React / JavaScript"), ("rust", "Rust"),
            ("golang", "Go"), ("php", "PHP"), ("bash", "Bash / Shell")
        ]
        for kw, name in langs:
            if re.search(rf"\b{re.escape(kw)}\b", t):
                return name
        return "the most appropriate programming language"

    def _refine_coding(self, text: str) -> Tuple[str, StructuredBreakdown, List[str]]:
        lang = self._detect_coding_language(text)

        persona = f"Principal Software Engineer and Technical Architect with senior-level mastery in {lang}"
        context = f"The objective is to implement a robust, maintainable, and high-performance solution for: \"{text}\""
        task = (
            f"1. Design a clean, modular, and idiomatic implementation in {lang}.\n"
            f"2. Add defensive input validation and comprehensive error handling for edge cases.\n"
            f"3. Include clear docstrings, inline comments for non-obvious logic, and strict type annotations."
        )
        constraints = (
            "- Follow SOLID design principles and clean code conventions.\n"
            "- Optimize time and space complexity; explicitly state Big-O analysis.\n"
            "- Avoid external libraries unless strictly standard or explicitly required.\n"
            "- Ensure the code is self-contained, fully executable, and free of placeholders."
        )
        output_format = (
            "1. **Architectural Overview:** Brief explanation of the technical approach.\n"
            "2. **Production Code Block:** Complete, commented code snippet.\n"
            "3. **Complexity Analysis:** Time and Space complexity breakdown.\n"
            "4. **Unit Test Suite:** Minimal test cases including typical inputs and edge cases."
        )

        full_prompt = (
            f"### Role & Persona\n"
            f"Act as a **{persona}**.\n\n"
            f"### Objective\n"
            f"{context}\n\n"
            f"### Implementation Requirements\n"
            f"{task}\n\n"
            f"### Architectural Constraints & Quality Gates\n"
            f"{constraints}\n\n"
            f"### Expected Output Format\n"
            f"{output_format}\n"
        )

        breakdown = StructuredBreakdown(
            persona=persona,
            context=context,
            task=task,
            constraints=constraints,
            output_format=output_format
        )

        suggestions = [
            f"Specify target runtime or framework version (e.g. {lang} 3.12+ or Node 20+)",
            "Ask for asynchronous (async/await) or multithreaded implementation if performance-critical",
            "Request Docker containerization or CI/CD test configuration"
        ]

        return full_prompt, breakdown, suggestions

    def _refine_writing(self, text: str) -> Tuple[str, StructuredBreakdown, List[str]]:
        persona = "Expert Copywriter, Editor, and Communications Strategist"
        context = f"Draft an engaging, impactful, and well-structured piece of content addressing: \"{text}\""
        task = (
            "1. Develop an arresting opening hook that captivates the target reader immediately.\n"
            "2. Establish a clear thematic thesis supported by evidence, anecdotes, or structured arguments.\n"
            "3. Maintain rhythmic prose variation, active voice, and high readability.\n"
            "4. Conclude with a memorable summary or compelling call to action."
        )
        constraints = (
            "- Tone: Authoritative yet accessible, engaging, and professional.\n"
            "- Avoid repetitive buzzwords, clichés, and passive voice phrasing.\n"
            "- Ensure logical narrative flow between sections using smooth transitions."
        )
        output_format = (
            "1. **Suggested Titles:** 3 creative, high-converting headline options.\n"
            "2. **Executive Summary / Hook:** Key takeaway in 2 sentences.\n"
            "3. **Complete Content:** Formatted with Markdown H2/H3 subheadings and bullet points.\n"
            "4. **Key Takeaways / Next Steps:** Actionable concluding bullets."
        )

        full_prompt = (
            f"### Role & Persona\n"
            f"Act as an **{persona}**.\n\n"
            f"### Objective\n"
            f"{context}\n\n"
            f"### Instructions & Content Structure\n"
            f"{task}\n\n"
            f"### Style & Tone Constraints\n"
            f"{constraints}\n\n"
            f"### Deliverable Format\n"
            f"{output_format}\n"
        )

        breakdown = StructuredBreakdown(
            persona=persona,
            context=context,
            task=task,
            constraints=constraints,
            output_format=output_format
        )

        suggestions = [
            "Define the intended audience (e.g. college students, enterprise executives, general public)",
            "Specify desired word count or reading time constraints",
            "Provide examples of specific tones (e.g. witty, solemn, inspiring, academic)"
        ]

        return full_prompt, breakdown, suggestions

    def _refine_education(self, text: str) -> Tuple[str, StructuredBreakdown, List[str]]:
        persona = "Distinguished University Professor and Master Pedagogical Educator"
        context = f"Create a comprehensive, engaging educational lesson explaining: \"{text}\""
        task = (
            "1. Introduce the core concept using an intuitive real-world analogy (Feynman Technique).\n"
            "2. Define the fundamental principles and theoretical foundations clearly.\n"
            "3. Walk through step-by-step examples progressing from simple to advanced.\n"
            "4. Highlight common misconceptions and provide clear explanations to avoid them."
        )
        constraints = (
            "- Break complex terminology into plain, intuitive explanations before introducing technical jargon.\n"
            "- Use visual text diagrams, structured comparison tables, or ASCII schematics where helpful.\n"
            "- Maintain an encouraging, intellectual, and didactic tone."
        )
        output_format = (
            "1. **Core Concept in Simple Terms:** High-level intuition.\n"
            "2. **Detailed Step-by-Step Breakdown:** Structured conceptual walkthrough.\n"
            "3. **Real-World Analogy & Case Study:** Practical application.\n"
            "4. **Self-Assessment Quiz:** 3 conceptual questions with detailed solutions."
        )

        full_prompt = (
            f"### Role & Persona\n"
            f"Act as a **{persona}**.\n\n"
            f"### Educational Goal\n"
            f"{context}\n\n"
            f"### Pedagogical Instructions\n"
            f"{task}\n\n"
            f"### Learning Constraints\n"
            f"{constraints}\n\n"
            f"### Lesson Structure\n"
            f"{output_format}\n"
        )

        breakdown = StructuredBreakdown(
            persona=persona,
            context=context,
            task=task,
            constraints=constraints,
            output_format=output_format
        )

        suggestions = [
            "Specify the student's background level (e.g. beginner high school, undergraduate, post-graduate)",
            "Request practice problems with step-by-step worked solutions",
            "Ask for historical background or modern real-world applications"
        ]

        return full_prompt, breakdown, suggestions
    
    def _refine_image(self, text: str) -> Tuple[str, StructuredBreakdown, List[str]]:
        # Clean punctuation from the user's original prompt.
        subject = text.strip().rstrip(" .,!;:")

        persona = (
            "Master AI Art Director and Prompt Engineer "
            "specializing in image-generation prompts"
     )

        context = (
            f"Create a detailed visual interpretation of: \"{subject}\""
        )

        task = (
            "1. Describe the main subject, setting, and composition clearly.\n"
            "2. Add relevant textures, colors, and visual details.\n"
            "3. Specify lighting and atmosphere appropriate to the scene.\n"
            "4. Keep the prompt coherent and tailored to the requested concept."
        )

        constraints = (
         "- Preserve the user's original concept.\n"
         "- Avoid contradictory camera, lighting, or rendering instructions.\n"
         "- Do not mix model-specific parameters into the general prompt.\n"
         "- Include a negative prompt as an optional suggestion."
     )

        output_format = (
            "1. **Master Prompt:** A polished, copy-ready image prompt.\n"
            "2. **Visual Breakdown:** Subject, composition, lighting, and colors.\n"
            "3. **Optional Parameters:** Aspect ratio or model-specific settings "
            "when appropriate.\n"
            "4. **Negative Prompt:** Suggestions for avoiding visual artifacts."
        )

        full_prompt = (
            "### Master Prompt\n"
            f"{subject}, richly detailed, carefully composed, "
            "cinematic lighting, atmospheric depth, cohesive color palette, "
            "realistic material textures, clear focal point, high visual quality.\n\n"
            "### Technical Visual Breakdown\n"
            f"- **Subject & Details:** {subject}\n"
            "- **Composition:** Balanced framing with clear visual hierarchy.\n"
            "- **Lighting & Atmosphere:** Lighting suited to the scene "
            "with natural depth and contrast.\n"
            "- **Textures & Colors:** Detailed surfaces and a harmonious palette.\n\n"
            "### Optional Image Settings\n"
            "Use a 16:9 aspect ratio for a widescreen composition if supported. "
            "Apply model-specific parameters only when using a compatible tool.\n\n"
            "### Recommended Negative Prompt\n"
            "`blurry, low resolution, distorted details, unwanted text, "
            "watermark, poor composition`"
        )

        breakdown = StructuredBreakdown(
            persona=persona,
            context=context,
            task=task,
            constraints=constraints,
            output_format=output_format
        )

        suggestions = [
            "Specify an aspect ratio, such as 16:9, 9:16, or 1:1",
            "Specify an artistic style, such as photography, 3D, or watercolor",
            "Describe the desired lighting, such as golden hour or neon lighting"
        ]

        return full_prompt, breakdown, suggestions


    def _refine_data_analysis(self, text: str) -> Tuple[str, StructuredBreakdown, List[str]]:
        persona = "Lead Data Scientist and Quantitative Analytics Director"
        context = f"Formulate an end-to-end data science and statistical analysis strategy for: \"{text}\""
        task = (
            "1. Define the analytical problem, primary KPIs, and formal statistical hypotheses.\n"
            "2. Formulate a comprehensive Exploratory Data Analysis (EDA) and data cleansing pipeline.\n"
            "3. Select appropriate statistical modeling or machine learning techniques with rigorous mathematical justification.\n"
            "4. Define robust validation strategies (cross-validation, confusion matrix, precision/recall, ROC-AUC, RMSE).\n"
            "5. Translate analytical outputs into actionable, metric-driven business insights."
        )
        constraints = (
            "- Use industry-standard Python libraries (Pandas, NumPy, Scikit-learn, Seaborn) or SQL.\n"
            "- Explicitly prevent data leakage in train/test splits and imputation steps.\n"
            "- Emphasize statistical significance testing and effect size over raw correlations."
        )
        output_format = (
            "1. **Executive Analysis Plan:** Problem formulation & business hypothesis.\n"
            "2. **Data Pipeline Architecture:** Step-by-step cleaning, feature engineering, and modeling.\n"
            "3. **Production Python / SQL Code:** Clean, vectorized code snippet with comments.\n"
            "4. **Visualization & Metric Interpretation:** Chart recommendations and business takeaways."
        )

        full_prompt = (
            f"### Role & Persona\n"
            f"Act as a **{persona}**.\n\n"
            f"### Analytical Objective\n"
            f"{context}\n\n"
            f"### Data Science Methodology\n"
            f"{task}\n\n"
            f"### Rigor & Validation Constraints\n"
            f"{constraints}\n\n"
            f"### Deliverable Schema\n"
            f"{output_format}\n"
        )

        breakdown = StructuredBreakdown(
            persona=persona,
            context=context,
            task=task,
            constraints=constraints,
            output_format=output_format
        )

        suggestions = [
            "Mention the dataset size and schema (e.g. tabular CSV, time-series, relational database)",
            "Specify target metric for optimization (e.g. churn rate, F1-score, revenue YoY, RMSE)",
            "Request automated EDA visualization script using Seaborn and Matplotlib"
        ]

        return full_prompt, breakdown, suggestions


# Global singleton instance
prompt_refiner = PromptRefinerEngine()
