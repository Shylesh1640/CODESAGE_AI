# CodeSage AI - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### For Users (No Setup Required)

Simply visit the live application:
**https://codesage-ai-tau.vercel.app**

> ⚠️ Note: The admin needs to configure the OpenAI API key for AI reviews to work.

---

### For Developers (Local Setup)

#### Prerequisites
- Node.js 18+ installed
- OpenAI API key (get from https://platform.openai.com/api-keys)

#### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Shylesh1640/CODESAGE_AI.git
cd CODESAGE_AI

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local

# 4. Edit .env.local and add your OpenAI API key
# OPENAI_API_KEY=sk-your-key-here
# OPENAI_MODEL=gpt-4o-mini

# 5. Start development server
npm run dev

# 6. Open browser
# Visit http://localhost:3000
```

That's it! You're ready to review code.

---

## 📝 How to Use

### 1. **Load Example Code** (Optional)
Click "Load Example Code" to see a sample with a deliberate bug.

### 2. **Paste Your Code**
Copy and paste any code you want to review into the editor.

### 3. **Select Language**
Choose from 14+ supported programming languages:
- JavaScript, TypeScript, Python, Java, C, C++, C#, Go, Rust, PHP, HTML, CSS, SQL, etc.

### 4. **Choose Review Type**
Select the type of analysis you need:
- **Complete Review** - Comprehensive analysis of all aspects
- **Bug Detection** - Focus on finding logical errors and bugs
- **Security Audit** - Identify vulnerabilities and security risks
- **Performance Analysis** - Optimize bottlenecks and efficiency
- **Code Quality** - Improve readability and best practices

### 5. **Add Context** (Optional)
Describe what your code is supposed to do for better analysis.

### 6. **Click "Review Code"**
Watch as the AI streams its analysis in real-time!

### 7. **Copy Results**
Use the copy button to save the review for later.

---

## 🎯 Example Workflow

**Scenario**: You have a JavaScript function that calculates order totals.

```javascript
// Your code
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i <= items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total;
}
```

**Steps**:
1. Click "Load Example Code" (this exact code is included!)
2. Language: JavaScript ✓
3. Review Type: Bug Detection ✓
4. Click "Review Code"
5. **AI finds the off-by-one error!** (`i <= items.length` should be `i < items.length`)

---

## 💡 Tips for Best Results

### Do's ✅
- Provide complete, runnable code when possible
- Select the correct programming language
- Add context about what the code should accomplish
- Use the appropriate review type for your needs
- Paste reasonable code sizes (under 20,000 characters)

### Don'ts ❌
- Don't paste incomplete code fragments (unless analyzing specific sections)
- Don't expect line-by-line explanations for extremely large files
- Don't submit empty or whitespace-only code
- Don't paste sensitive credentials or API keys

---

## 🐛 Troubleshooting

### "API service is not properly configured"
**Solution**: The OpenAI API key needs to be configured in the environment variables.
- **Local**: Add `OPENAI_API_KEY` to `.env.local`
- **Production**: Configure in Vercel dashboard

### "Please enter some code before starting your review"
**Solution**: The code editor is empty. Paste some code first.

### "Your code exceeds the maximum allowed length"
**Solution**: Your code is over 20,000 characters. Break it into smaller sections.

### Review is loading forever
**Solution**: 
1. Check your internet connection
2. Verify the OpenAI API key is valid
3. Check if you've reached API rate limits
4. Try refreshing and submitting again

### Copy button not working
**Solution**: 
1. Ensure a review has completed
2. Check browser clipboard permissions
3. Try manually selecting and copying the text

---

## ⌨️ Keyboard Tips

- **Tab**: Navigate between fields
- **Ctrl+V / Cmd+V**: Paste code
- **Ctrl+C / Cmd+C**: Copy selected text
- **Enter**: Submit form (when focused on inputs)

---

## 🎨 Customization (For Developers)

### Change AI Model
Edit `.env.local`:
```bash
OPENAI_MODEL=gpt-4o          # Most capable (more expensive)
OPENAI_MODEL=gpt-4o-mini     # Fast and cost-effective (default)
OPENAI_MODEL=gpt-4-turbo     # Balanced
```

### Modify Code Length Limit
Edit `lib/validation.ts`:
```typescript
const MAX_CODE_LENGTH = 20000; // Change this value
```

### Customize Review Prompts
Edit `lib/prompts.ts` to adjust the AI's behavior and output format.

### Update Supported Languages
Edit `types/review.ts` to add or remove language options.

---

## 📊 Understanding Results

### Severity Levels
- **Critical** 🔴 - Must fix immediately (crashes, security holes)
- **High** 🟠 - Should fix soon (bugs, major issues)
- **Medium** 🟡 - Consider fixing (code quality, minor bugs)
- **Low** 🟢 - Nice to have (optimizations, style)

### Review Sections
Results are organized into clear sections:
- **Overall Assessment** - High-level summary
- **Summary** - Key findings overview
- **Critical Issues** - Urgent problems (if any)
- **Bugs and Logical Errors** - Functional problems
- **Security Findings** - Vulnerabilities and risks
- **Performance Improvements** - Optimization opportunities
- **Code Quality Suggestions** - Best practices
- **Recommended Corrected Code** - Fixed version
- **Final Recommendations** - Next steps

---

## 🔒 Security & Privacy

- **Your code is NOT stored**: Reviews are processed in real-time and not saved
- **API calls are secure**: All communication uses HTTPS
- **API keys are protected**: Keys never leave the server
- **No tracking**: No analytics on your code content

---

## 💰 Cost Information

### For Developers Running Locally
- **OpenAI API** (gpt-4o-mini): ~$0.001-$0.01 per review
- Approximately $3-10 for 1,000 reviews

### For Users of Hosted Version
- **Free to use**: No cost to end users
- Costs covered by the host

---

## 🆘 Need Help?

- **Documentation**: Check [README.md](README.md) for detailed docs
- **Deployment**: See [DEPLOYMENT.md](DEPLOYMENT.md) for hosting guide
- **Issues**: Report bugs at https://github.com/Shylesh1640/CODESAGE_AI/issues
- **OpenAI Docs**: https://platform.openai.com/docs

---

## 🎉 What's Next?

Once you're comfortable with basic reviews:

1. **Try different review types** - Each provides unique insights
2. **Use context field** - More context = better analysis
3. **Compare languages** - See how analysis differs by language
4. **Test edge cases** - Submit unusual code patterns
5. **Contribute** - Fork the repo and add features!

---

**Happy Coding! Let CodeSage AI help you write better software.** 🚀

Built with Next.js • Powered by OpenAI • Deployed on Vercel
