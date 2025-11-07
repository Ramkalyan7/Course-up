import { breakdownTopic, generateSubtopicContent, searchArticles } from '../lib/api/perplexity';
import { fetchYoutubeVideos } from '../lib/api/youtube';

async function testBackend() {
  try {
    console.log('\n=== TESTING BACKEND ===\n');

    const topic = 'JavaScript Basics';

    // Test 1: Break down topic
    console.log('Test 1: Breaking down topic...');
    const breakdown = await breakdownTopic(topic);
    console.log(`✓ Got ${breakdown.subtopics.length} subtopics\n`);
    console.log('Subtopics:');
    breakdown.subtopics.forEach((s, idx) => {
      console.log(`${idx + 1}. ${s.title} (${s.difficulty})`);
    });

    // Test 2: Generate content for first subtopic
    console.log(`\nTest 2: Generating content for first subtopic...`);
    const firstSubtopic = breakdown.subtopics[0];
    const content = await generateSubtopicContent(firstSubtopic.title, firstSubtopic.description);
    console.log(`✓ Generated content`);
    console.log(`  - Concepts: ${content.aiGeneratedContent.keyConceptsExplained.length}`);
    console.log(`  - Quizzes: ${Object.keys(content.quizzes).length}`);

    // Test 3: Fetch YouTube videos
    console.log(`\nTest 3: Fetching YouTube videos...`);
    const videos = await fetchYoutubeVideos(firstSubtopic.searchTerms[0]);
    console.log(`✓ Found ${videos.length} videos`);
    if (videos.length > 0) {
      console.log(`  - ${videos[0].title}`);
    }

    // Test 4: Search for articles
    console.log(`\nTest 4: Searching for articles...`);
    const articles = await searchArticles(firstSubtopic.searchTerms[0]);
    console.log(`✓ Found ${articles.length} articles`);
    if (articles.length > 0) {
      console.log(`  - ${articles[0].title}`);
    }

    console.log('\n=== ALL TESTS PASSED ===\n');
  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
}

testBackend();
