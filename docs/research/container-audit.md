# Container Styles Audit

## Overview
This audit analyzes container styles across all pages and components to identify inconsistencies and standardization opportunities.

## Layout System Analysis

### Base Layout (PageLayout.astro)
- **Content Layout**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Info Layout**: `max-w-screen-xl` (full width with sidebar)
- **Default Layout**: No base container (uses individual page containers)

## Page-by-Page Analysis

### Homepage (index.astro)
- Uses custom full-screen layout with centered content
- Container: `max-w-3xl mx-auto` for tags
- **Status**: ✅ Custom layout appropriate

### Content Pages

#### Who We Are (who-we-are.astro)
- Container: `max-w-4xl` (text content)
- **Status**: ⚠️ Inconsistent - no mx-auto centering

#### Contact (contact.astro)
- Container: `max-w-2xl mx-auto` (form)
- Container: `max-w-4xl mx-auto` (content)
- **Status**: ⚠️ Mixed container sizes

#### Donate (donate.astro)
- Container: `max-w-2xl mx-auto`
- **Status**: ✅ Consistent

#### Events (events.astro)
- Uses: `useInfoLayout={true}` (base layout provides container)
- **Status**: ✅ Uses layout system correctly

### What We Do Pages

#### Overview (what-we-do/index.astro)
- Container: `max-w-4xl`
- **Status**: ⚠️ Missing mx-auto

#### AI Hackathon (ai-hackathon/index.astro)
- Container: `max-w-4xl mx-auto` (hero)
- **Status**: ✅ Consistent

#### Workers Assist (workers-assist.astro)
- Multiple containers: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`
- Container: `max-w-2xl mx-auto` (text blocks)
- Container: `max-w-4xl mx-auto` (sections)
- **Status**: ❌ Multiple inconsistent sizes

#### PlantCore AI (plantcore-ai.astro)
- Multiple containers: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Container: `max-w-4xl mx-auto` (text blocks)
- Container: `max-w-5xl mx-auto` (content blocks)
- Container: `max-w-6xl mx-auto` (sections)
- **Status**: ❌ Highly inconsistent

#### SRTP (srtp.astro)
- Uses: `useContentLayout={true}` (base layout provides `max-w-7xl mx-auto`)
- **Status**: ✅ Uses layout system correctly

## Issues Identified

### 1. Container Width Inconsistencies
- **max-w-2xl**: Donate, Contact (form)
- **max-w-3xl**: Homepage tags
- **max-w-4xl**: Contact (content), Who We Are, Workers Assist, PlantCore AI
- **max-w-5xl**: PlantCore AI
- **max-w-6xl**: Workers Assist, PlantCore AI
- **max-w-7xl**: Layout system, PlantCore AI

### 2. Missing Centering
- Some containers lack `mx-auto` class
- Who We Are page content not centered

### 3. Padding Inconsistencies
- Some pages use layout padding: `px-4 sm:px-6 lg:px-8`
- Others rely on individual containers
- Inconsistent application

### 4. Layout System Usage
- Some pages use `useContentLayout` (provides base container)
- Others implement custom containers
- No clear pattern for when to use which approach

## Recommendations

### 1. Standardize Container Sizes
- **Text Content**: `max-w-4xl mx-auto` (standard reading width)
- **Form Content**: `max-w-2xl mx-auto` (compact forms)
- **Wide Content**: `max-w-6xl mx-auto` (cards, grids)
- **Full Layout**: `max-w-7xl mx-auto` (base layout system)

### 2. Use Layout System Consistently
- Prefer `useContentLayout` for standard pages
- Custom containers only for special layouts (homepage, landing pages)

### 3. Standardize Padding
- Layout system handles base padding: `px-4 sm:px-6 lg:px-8`
- Page content should not duplicate this
- Inner sections can add additional spacing as needed

### 4. Create Utility Classes
Consider adding these utility classes to streamline usage:
- `.container-text` → `max-w-4xl mx-auto`
- `.container-form` → `max-w-2xl mx-auto`
- `.container-wide` → `max-w-6xl mx-auto`
- `.container-full` → `max-w-7xl mx-auto`

## Standardization Plan

### Phase 1: Layout System Consistency
**Priority: HIGH** - Most pages should use the layout system properly

#### Pages to Update:
1. **who-we-are.astro**: Add `useContentLayout={true}` to use base container
2. **what-we-do/index.astro**: Add `mx-auto` to existing `max-w-4xl`

### Phase 2: Container Consolidation
**Priority: MEDIUM** - Reduce container variety for consistency

#### Workers Assist (workers-assist.astro)
- **Current**: Multiple sizes (2xl, 4xl, 6xl)
- **Target**: Use `useContentLayout` + inner containers as needed
- **Action**: Replace custom containers with layout system

#### PlantCore AI (plantcore-ai.astro)
- **Current**: Multiple sizes (4xl, 5xl, 6xl, 7xl)
- **Target**: Use `useContentLayout` + standardized inner containers
- **Action**: Most critical - has 4 different container widths

### Phase 3: Contact Page Optimization
**Priority: LOW** - Works but could be more consistent

#### Contact (contact.astro)
- **Current**: Mixed 2xl/4xl containers
- **Target**: Use layout system with inner content containers
- **Action**: Maintain current UX but improve structure

### Implementation Strategy

#### 1. Layout System Rules
```astro
<!-- Standard content pages -->
<PageLayout useContentLayout={true}>
  <!-- Content automatically gets max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -->
</PageLayout>

<!-- Info pages with sidebar -->
<PageLayout useInfoLayout={true}>
  <!-- Gets sidebar layout with proper containers -->
</PageLayout>

<!-- Custom layouts (homepage, landing pages) -->
<PageLayout>
  <!-- Custom container implementation -->
</PageLayout>
```

#### 2. Inner Container Standards
```astro
<!-- Text-heavy content -->
<div class="max-w-4xl mx-auto">
  <!-- Optimal reading width -->
</div>

<!-- Form content -->
<div class="max-w-2xl mx-auto">
  <!-- Compact forms -->
</div>

<!-- Card grids, wide content -->
<div class="max-w-6xl mx-auto">
  <!-- When you need more width than text -->
</div>
```

#### 3. Padding Rules
- **Layout system provides**: `px-4 sm:px-6 lg:px-8`
- **Pages should NOT duplicate** this padding
- **Inner sections can add**: `py-8`, `py-12`, `py-16` for spacing

### Quick Win Implementation

#### Priority Order:
1. **who-we-are.astro** - Simple fix (add `useContentLayout`)
2. **what-we-do/index.astro** - Simple fix (add `mx-auto`)
3. **workers-assist.astro** - Medium complexity
4. **plantcore-ai.astro** - Most complex but highest impact

### Benefits of Standardization
- **Consistency**: Unified visual rhythm across site
- **Maintainability**: Fewer custom containers to manage
- **Responsive**: Layout system handles all breakpoints
- **Performance**: Less CSS duplication
- **Developer Experience**: Clear patterns to follow

## Implementation Checklist
- [ ] Fix who-we-are.astro layout
- [ ] Fix what-we-do/index.astro centering
- [ ] Refactor workers-assist.astro containers
- [ ] Refactor plantcore-ai.astro containers
- [ ] Test responsive behavior on all pages
- [ ] Update component documentation
- [ ] Create container system guidelines

## Next Steps
1. ✅ Complete audit of all pages
2. ✅ Create detailed standardization plan
3. ⏳ Implement Phase 1 fixes (layout system)
4. ⏳ Implement Phase 2 fixes (container consolidation)
5. ⏳ Test responsive behavior across all breakpoints
6. ⏳ Document final container system guidelines