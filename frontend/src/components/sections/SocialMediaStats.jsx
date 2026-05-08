import { Card, CardBody } from '../ui/Card';
import SectionHeader from '../ui/SectionHeader';
import MetricCard from '../ui/MetricCard';

const PlatformCard = ({ name, data, icon, color }) => {
  if (!data) return null;
  return (
    <MetricCard
      label={name}
      value={data.followers || data.subscribers || data.stars}
      change={data.growth}
      trend={data.growth > 0 ? 'up' : 'down'}
      icon={icon}
    />
  );
};

const SocialMediaStats = ({ social }) => {
  if (!social) return null;

  const platforms = [
    { name: 'LinkedIn', data: social.linkedin, color: '#0A66C2', key: 'linkedin' },
    { name: 'Twitter / X', data: social.twitter, color: '#1DA1F2', key: 'twitter' },
    { name: 'YouTube', data: social.youtube, color: '#FF0000', key: 'youtube' },
    { name: 'GitHub', data: social.github, color: '#333', key: 'github' },
  ];

  const hasData = platforms.some(p => p.data);

  if (!hasData) return null;

  return (
    <Card>
      <SectionHeader
        title="Social Media Intelligence"
        subtitle="Follower counts, growth rates & engagement"
        icon={
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        }
      />
      <CardBody>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {social.linkedin && (
            <div className="bg-gray-800/80 rounded-xl border border-gray-700 p-5 hover:border-gray-600 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">LinkedIn</span>
                <svg className="w-5 h-5 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-white">{social.linkedin.followers}</span>
                {social.linkedin.growth && (
                  <span className="flex items-center gap-1 text-sm font-medium text-green-400">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    {social.linkedin.growth}%
                  </span>
                )}
              </div>
              {social.linkedin.postsPerWeek && (
                <p className="text-xs text-gray-500 mt-2">{social.linkedin.postsPerWeek} posts/week</p>
              )}
            </div>
          )}
          {social.twitter && (
            <div className="bg-gray-800/80 rounded-xl border border-gray-700 p-5 hover:border-gray-600 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Twitter / X</span>
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-white">{social.twitter.followers}</span>
                {social.twitter.growth && (
                  <span className="flex items-center gap-1 text-sm font-medium text-green-400">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    {social.twitter.growth}%
                  </span>
                )}
              </div>
              {social.twitter.postsPerWeek && (
                <p className="text-xs text-gray-500 mt-2">{social.twitter.postsPerWeek} posts/week</p>
              )}
            </div>
          )}
          {social.youtube && (
            <div className="bg-gray-800/80 rounded-xl border border-gray-700 p-5 hover:border-gray-600 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">YouTube</span>
                <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-white">{social.youtube.subscribers}</span>
                {social.youtube.growth && (
                  <span className="flex items-center gap-1 text-sm font-medium text-green-400">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    {social.youtube.growth}%
                  </span>
                )}
              </div>
              {social.youtube.videosPerMonth && (
                <p className="text-xs text-gray-500 mt-2">{social.youtube.videosPerMonth} videos/month</p>
              )}
            </div>
          )}
          {social.github && (
            <div className="bg-gray-800/80 rounded-xl border border-gray-700 p-5 hover:border-gray-600 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">GitHub</span>
                <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-white">{social.github.stars} ★</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">{social.github.contributions} contributions</p>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default SocialMediaStats;
